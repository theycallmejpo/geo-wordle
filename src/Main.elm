port module Main exposing (main)

import Browser
import Browser.Events
import Date exposing (Date)
import Html exposing (Html, div, form, input, nav, p, text)
import Html.Attributes as Attr exposing (class, type_, value)
import Html.Events as Evts exposing (onClick)
import Json.Decode exposing (Decoder, field)
import Process
import Task
import Time
import Words exposing (wordOfTheDay)


main : Program () Model Msg
main =
    Browser.element
        { init =
            \_ ->
                ( Loading
                , Task.perform GotDate Date.today
                )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


port showDialog : String -> Cmd msg



-- MODEL


type Model
    = Loading
    | Failed String
    | GameInProgress (List Guess) Solution Int (Maybe String)
    | GameCompleted (List Guess) Solution


type alias Solution =
    String


type Guess
    = GuessIdle
    | GuessCurrent String
    | GuessFinished String



-- UPDATE


type Msg
    = GotDate Date
    | CurrentGuessUpdated String
    | LetterPressed Char
    | BackspacePressed
    | EnterPressed
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotDate today ->
            case wordOfTheDay today of
                Just solution ->
                    ( GameInProgress
                        [ GuessCurrent "" ]
                        solution
                        6
                        Nothing
                    , Cmd.none
                    )

                Nothing ->
                    ( Failed "Unable to get word of the day", Cmd.none )

        CurrentGuessUpdated currentGuess ->
            case model of
                GameInProgress guesses solution maxGuesses _ ->
                    let
                        updatedGuesses =
                            GuessCurrent currentGuess
                                |> List.singleton
                                |> List.append
                                    (guesses
                                        |> List.reverse
                                        |> List.drop 1
                                        |> List.reverse
                                    )
                    in
                    ( GameInProgress updatedGuesses solution maxGuesses Nothing, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        LetterPressed l ->
            case model of
                GameInProgress guesses solution maxGuesses _ ->
                    case List.head <| List.reverse guesses of
                        Just guess ->
                            case guess of
                                GuessCurrent currentGuess ->
                                    let
                                        updatedGuesses =
                                            String.left 5 (currentGuess ++ String.fromChar l)
                                                |> GuessCurrent
                                                |> List.singleton
                                                |> List.append
                                                    (guesses
                                                        |> List.reverse
                                                        |> List.drop 1
                                                        |> List.reverse
                                                    )
                                    in
                                    ( GameInProgress updatedGuesses solution maxGuesses Nothing, Cmd.none )

                                _ ->
                                    ( model, Cmd.none )

                        Nothing ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        BackspacePressed ->
            case model of
                GameInProgress guesses solution maxGuesses _ ->
                    case List.head <| List.reverse guesses of
                        Just guess ->
                            case guess of
                                GuessCurrent currentGuess ->
                                    let
                                        updatedGuesses =
                                            String.dropRight 1 currentGuess
                                                |> GuessCurrent
                                                |> List.singleton
                                                |> List.append
                                                    (guesses
                                                        |> List.reverse
                                                        |> List.drop 1
                                                        |> List.reverse
                                                    )
                                    in
                                    ( GameInProgress updatedGuesses solution maxGuesses Nothing, Cmd.none )

                                _ ->
                                    ( model, Cmd.none )

                        Nothing ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        EnterPressed ->
            case model of
                GameInProgress guesses solution maxGuesses _ ->
                    case List.head <| List.reverse guesses of
                        Just guess ->
                            case guess of
                                GuessCurrent currentGuess ->
                                    if solution == currentGuess then
                                        let
                                            completedGuesses =
                                                [ GuessFinished currentGuess ]
                                                    |> List.append
                                                        (guesses
                                                            |> List.reverse
                                                            |> List.drop 1
                                                            |> List.reverse
                                                        )
                                                    |> List.take maxGuesses
                                        in
                                        ( GameCompleted completedGuesses solution, Cmd.none )

                                    else if String.length currentGuess < String.length solution then
                                        ( GameInProgress
                                            guesses
                                            solution
                                            maxGuesses
                                            (Just "Not enough letters")
                                        , Cmd.none
                                        )

                                    else if not <| Words.wordExists currentGuess then
                                        ( GameInProgress
                                            guesses
                                            solution
                                            maxGuesses
                                            (Just "Not in word list")
                                        , Cmd.none
                                        )

                                    else if List.length guesses == maxGuesses then
                                        let
                                            completedGuesses =
                                                [ GuessFinished currentGuess ]
                                                    |> List.append
                                                        (guesses
                                                            |> List.reverse
                                                            |> List.drop 1
                                                            |> List.reverse
                                                        )
                                                    |> List.take maxGuesses
                                        in
                                        ( GameCompleted completedGuesses solution, Cmd.none )

                                    else if String.length currentGuess == 5 then
                                        let
                                            updatedGuesses =
                                                [ GuessFinished currentGuess, GuessCurrent "" ]
                                                    |> List.append
                                                        (guesses
                                                            |> List.reverse
                                                            |> List.drop 1
                                                            |> List.reverse
                                                        )
                                                    |> List.take maxGuesses
                                        in
                                        ( GameInProgress updatedGuesses solution maxGuesses Nothing, Cmd.none )

                                    else
                                        ( model, Cmd.none )

                                _ ->
                                    ( model, Cmd.none )

                        Nothing ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            p [] [ text "Loading..." ]

        Failed errorMsg ->
            p [] [ text errorMsg ]

        GameInProgress guesses solution maxGuesses error ->
            div []
                [ viewHeader model
                , viewErrorMessage error
                , viewGame guesses solution maxGuesses
                ]

        GameCompleted _ _ ->
            div [ class "flex items-center justify-center h-screen" ]
                [ p [ class "text-3xl font-bold" ] [ text "Game done!" ]
                ]


viewHeader : Model -> Html msg
viewHeader _ =
    nav [ class "border-b w-full py-4 text-center font-bold text-2xl font-serif" ] [ text "Wordle" ]


viewErrorMessage : Maybe String -> Html msg
viewErrorMessage m =
    case m of
        Just message ->
            div [ class "fixed w-full flex justify-center mt-8" ]
                [ p
                    [ class "text-sm text-white py-2 px-3 bg-gray-700 w-auto rounded" ]
                    [ text message ]
                ]

        Nothing ->
            text ""


viewGame : List Guess -> Solution -> Int -> Html Msg
viewGame guesses solution maxGuesses =
    createFillerGuesses (List.length guesses + 1) maxGuesses
        |> List.append guesses
        |> List.foldl viewGuess []
        |> div [ class "mx-auto w-[24rem] mt-24 text-sm grid grid-cols-5 grid-rows-6 gap-1.5" ]


viewGuess : Guess -> List (Html Msg) -> List (Html Msg)
viewGuess guess acc =
    case guess of
        GuessIdle ->
            List.map
                (\_ -> div [ class guessBoxClasses ] [])
                (List.repeat 5 0)
                |> List.append acc

        GuessCurrent currentGuess ->
            List.append (String.toList currentGuess) (List.repeat (5 - String.length currentGuess) ' ')
                |> List.map
                    (\letter ->
                        div
                            [ class guessBoxClasses ]
                            [ text <| String.fromChar letter ]
                    )
                |> List.append acc

        GuessFinished previousGuess ->
            String.toList previousGuess
                |> List.map
                    (\letter ->
                        div
                            [ class <| String.join " " [ guessBoxClasses, "bg-red-200" ] ]
                            [ text <| String.fromChar letter ]
                    )
                |> List.append acc


guessBoxClasses : String
guessBoxClasses =
    "border border-black aspect-square flex justify-center items-center uppercase font-bold text-3xl"



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onKeyDown keyDecoder


keyDecoder : Json.Decode.Decoder Msg
keyDecoder =
    Json.Decode.map toKey (Json.Decode.field "key" Json.Decode.string)


toKey : String -> Msg
toKey string =
    case string of
        "Backspace" ->
            BackspacePressed

        "Enter" ->
            EnterPressed

        _ ->
            case String.uncons <| string of
                Just ( letter, "" ) ->
                    LetterPressed <| letter

                _ ->
                    NoOp



-- HELPERS


delay : Float -> msg -> Cmd msg
delay time msg =
    Process.sleep time
        |> Task.perform (\_ -> msg)



-- Guess


createFillerGuesses : Int -> Int -> List Guess
createFillerGuesses min max =
    List.range min max
        |> List.map (\_ -> GuessIdle)
