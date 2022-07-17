module Main exposing (main)

import Array
import Browser
import Browser.Events
import Date exposing (Date)
import Dict exposing (Dict)
import Html exposing (Html, div, form, input, nav, p, text)
import Html.Attributes as Attr exposing (class, type_, value)
import Html.Events as Evts exposing (onClick)
import Json.Decode
import Task
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



-- MODEL


type Model
    = Loading
    | Failed String
    | GameInProgress (List Guess) Solution Int (Maybe String)
    | GameCompleted (List Guess) Solution


type LetterStatus
    = Correct
    | WrongPlace
    | ToDo


type alias Solution =
    String


type alias GuessedLetter =
    { letter : String
    , status : LetterStatus
    }


type Guess
    = GuessIdle
    | GuessCurrent String
    | GuessFinished (List GuessedLetter)



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
                                                [ GuessFinished (parseGuess solution currentGuess) ]
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

                                    else if List.length guesses < maxGuesses then
                                        let
                                            updatedGuesses =
                                                [ GuessFinished (parseGuess solution currentGuess), GuessCurrent "" ]
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

        GuessFinished finishedGuess ->
            finishedGuess
                |> List.map
                    (\{ letter, status } ->
                        div
                            [ class <| String.join " " [ guessBoxClasses, bgColor status ] ]
                            [ text letter ]
                    )
                |> List.append acc


guessBoxClasses : String
guessBoxClasses =
    "border border-black aspect-square flex justify-center items-center uppercase font-bold text-3xl"


bgColor : LetterStatus -> String
bgColor status =
    case status of
        Correct ->
            "bg-green-200"

        WrongPlace ->
            "bg-amber-200"

        _ ->
            "bg-gray-200"



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



-- GAME


parseGuess : String -> String -> List GuessedLetter
parseGuess solution guess =
    let
        listWithCorrectGueses =
            String.toList guess
                |> List.indexedMap Tuple.pair
                |> List.map (checkLetter solution)

        remainingLettersMap =
            listWithCorrectGueses
                |> List.indexedMap Tuple.pair
                |> List.foldl grabTodoLetterIndex Dict.empty
                |> Debug.log "remainder"
    in
    listWithCorrectGueses



-- |> List.foldl


type alias Temp =
    { remaining : Dict String (List Int)
    , parsed : List GuessedLetter
    }


do : GuessedLetter -> Temp -> Temp
do { letter, status } { remaining, parsed } ch =
    case status of
        ToDo ->
            if Dict.member letter remaining then
                Temp remaining parsed

            else
                Temp remaining parsed

        _ ->
            Temp remaining <| List.append parsed [ GuessedLetter letter status ]


grabTodoLetterIndex : ( Int, GuessedLetter ) -> Dict String (List Int) -> Dict String (List Int)
grabTodoLetterIndex ( index, { letter, status } ) dict =
    case status of
        ToDo ->
            let
                maybeIndexes =
                    Dict.get letter dict
            in
            case maybeIndexes of
                Just indexes ->
                    Dict.insert letter (List.append indexes [ index ]) dict

                Nothing ->
                    Dict.insert letter [ index ] dict

        _ ->
            dict


checkLetter : String -> ( Int, Char ) -> GuessedLetter
checkLetter solution ( index, char ) =
    let
        solutionLetter =
            getLetterAtIndex solution index

        letter =
            String.fromChar char
    in
    case solutionLetter of
        Just correctLetter ->
            if correctLetter == letter then
                GuessedLetter letter Correct

            else
                GuessedLetter letter ToDo

        Nothing ->
            GuessedLetter letter Correct


getLetterAtIndex : String -> Int -> Maybe String
getLetterAtIndex solution index =
    String.toList solution
        |> Array.fromList
        |> Array.get index
        |> Maybe.map String.fromChar


createFillerGuesses : Int -> Int -> List Guess
createFillerGuesses min max =
    List.range min max
        |> List.map (\_ -> GuessIdle)
