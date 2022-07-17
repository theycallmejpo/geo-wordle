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
        solutionAsList =
            solution
                |> String.toList
                |> List.map String.fromChar
                |> List.indexedMap Tuple.pair

        zipped =
            guess
                |> String.toList
                |> List.map String.fromChar
                |> List.map2 Tuple.pair solutionAsList

        { list, dict } =
            zipped
                |> List.foldl checkLetterAndStoreMismatch (Temp [] Dict.empty)
                |> Debug.log ""

        result =
            list
                |> List.foldl checkLettersInWrongPlace (Temp [] dict)
    in
    result.list


type alias Temp =
    { list : List GuessedLetter
    , dict : Dict String (List Int)
    }


checkLettersInWrongPlace : GuessedLetter -> Temp -> Temp
checkLettersInWrongPlace { letter, status } { list, dict } =
    case status of
        ToDo ->
            case Dict.get letter dict of
                Just indexes ->
                    case indexes of
                        -- Only keep the key in the dictionary when the values
                        -- for `letter` has at least 2 indexes, otherwise drop
                        -- the key
                        _ :: _ :: _ ->
                            let
                                newList =
                                    GuessedLetter letter WrongPlace
                                        |> List.singleton
                                        |> List.append list

                                newDict =
                                    Dict.insert letter (List.drop 1 indexes) dict
                            in
                            Temp newList newDict

                        _ ->
                            let
                                newList =
                                    GuessedLetter letter WrongPlace
                                        |> List.singleton
                                        |> List.append list

                                newDict =
                                    Dict.remove letter dict
                            in
                            Temp newList newDict

                Nothing ->
                    let
                        newList =
                            GuessedLetter letter status
                                |> List.singleton
                                |> List.append list
                    in
                    Temp newList dict

        _ ->
            let
                newList =
                    GuessedLetter letter status
                        |> List.singleton
                        |> List.append list
            in
            Temp newList dict


checkLetterAndStoreMismatch : ( ( Int, String ), String ) -> Temp -> Temp
checkLetterAndStoreMismatch ( ( solutionIndex, solutionLetter ), guessedLetter ) { list, dict } =
    if solutionLetter == guessedLetter then
        let
            newList =
                GuessedLetter guessedLetter Correct
                    |> List.singleton
                    |> List.append list
        in
        Temp newList dict

    else
        let
            newList =
                GuessedLetter guessedLetter ToDo
                    |> List.singleton
                    |> List.append list

            newDict =
                case Dict.get solutionLetter dict of
                    Just indexes ->
                        let
                            newIndexes =
                                solutionIndex
                                    |> List.singleton
                                    |> List.append indexes
                        in
                        Dict.insert solutionLetter newIndexes dict

                    Nothing ->
                        Dict.insert solutionLetter [ solutionIndex ] dict
        in
        Temp newList newDict


createFillerGuesses : Int -> Int -> List Guess
createFillerGuesses min max =
    List.range min max
        |> List.map (\_ -> GuessIdle)
