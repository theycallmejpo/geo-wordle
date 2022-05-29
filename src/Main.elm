module Main exposing (main)

import Browser
import Browser.Events
import Html exposing (Html, div, form, input, nav, p, text)
import Html.Attributes as Attr exposing (class, type_, value)
import Html.Events as Evts exposing (onClick)
import Http
import Json.Decode exposing (Decoder, field)


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( Loading, fetchSolutionOfTheDay )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type Model
    = Loading
    | Failed String
    | LoadedInProgress (List Guess) Solution Int
    | LoadedCompleted (List Guess) Solution


type alias Solution =
    String


type Guess
    = GuessIdle
    | GuessCurrent String
    | GuessFinished String Int



-- list of guesses
--  each guess has 5 letters (should be configurable)
-- need to keep state about correctness of each letter? could probably be derived though
-- UPDATE


type Msg
    = GotResponse (Result Http.Error String)
    | CurrentGuessUpdated String
    | LetterPressed Char
    | BackspacePressed
    | EnterPressed
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResponse res ->
            case res of
                Ok solution ->
                    ( LoadedInProgress [ GuessCurrent "" ] solution 6
                    , Cmd.none
                    )

                Err _ ->
                    -- currently no need to pattern match on the error
                    ( Failed "unable to fetch today's word", Cmd.none )

        CurrentGuessUpdated currentGuess ->
            case model of
                LoadedInProgress guesses solution maxGuesses ->
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
                    ( LoadedInProgress updatedGuesses solution maxGuesses, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        LetterPressed l ->
            case model of
                LoadedInProgress guesses solution maxGuesses ->
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
                                    ( LoadedInProgress updatedGuesses solution maxGuesses, Cmd.none )

                                _ ->
                                    ( model, Cmd.none )

                        Nothing ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        BackspacePressed ->
            case model of
                LoadedInProgress guesses solution maxGuesses ->
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
                                    ( LoadedInProgress updatedGuesses solution maxGuesses, Cmd.none )

                                _ ->
                                    ( model, Cmd.none )

                        Nothing ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        EnterPressed ->
            ( model, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



-- VIEW>


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            p [] [ text "Loading..." ]

        Failed errorMsg ->
            p [] [ text errorMsg ]

        LoadedInProgress guesses solution maxGuesses ->
            div []
                [ viewHeader model
                , viewGame guesses solution maxGuesses
                ]

        LoadedCompleted _ _ ->
            p [] [ text "Game done!" ]


viewHeader : Model -> Html msg
viewHeader _ =
    nav [ class "border-b w-full py-4 text-center font-bold text-2xl font-serif" ] [ text "Wordle" ]


viewGame : List Guess -> Solution -> Int -> Html Msg
viewGame guesses solution maxGuesses =
    createFillerGuesses (List.length guesses + 1) maxGuesses
        |> List.append guesses
        |> Debug.log "guesses"
        |> List.foldl viewGuess []
        |> div [ class "mx-auto w-[24rem] my-8 text-sm grid grid-cols-5 grid-rows-6 gap-2" ]


viewGuess : Guess -> List (Html Msg) -> List (Html Msg)
viewGuess guess acc =
    case guess of
        GuessIdle ->
            List.map
                (\_ -> div [ class "border border-black aspect-square flex justify-center items-center" ] [])
                (List.repeat 5 0)
                |> List.append acc

        GuessCurrent currentGuess ->
            List.append (String.toList currentGuess) (List.repeat (5 - String.length currentGuess) ' ')
                |> List.map
                    (\letter ->
                        div
                            [ class "border border-black aspect-square flex justify-center items-center uppercase" ]
                            [ text <| String.fromChar letter ]
                    )
                |> List.append acc

        GuessFinished userGuess _ ->
            [ div
                [ class "bg-green-200 rounded-md px-4 py-2 w-full mb-4" ]
                [ text userGuess ]
            ]



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
            case String.uncons <| Debug.log "type" string of
                Just ( letter, "" ) ->
                    LetterPressed <| Debug.log "got" letter

                _ ->
                    NoOp



-- HTTP


fetchSolutionOfTheDay : Cmd Msg
fetchSolutionOfTheDay =
    Http.get
        { url = "http://localhost:5019/2022-02-12"
        , expect = Http.expectJson GotResponse decoder
        }


decoder : Decoder String
decoder =
    field "solution" Json.Decode.string



-- Guess


createFillerGuesses : Int -> Int -> List Guess
createFillerGuesses min max =
    List.range min max
        |> List.map (\_ -> GuessIdle)
