module Main exposing (main)

import Browser
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
        , subscriptions = \_ -> Sub.none
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
    = GuessIdle Int
    | GuessCurrent String
    | GuessFinished String Int



-- UPDATE


type Msg
    = GotResponse (Result Http.Error String)
    | CurrentGuessUpdated String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResponse res ->
            case res of
                Ok solution ->
                    ( LoadedInProgress [ GuessFinished "waaaz" 80, GuessCurrent "" ] solution 6
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
    nav [ class "border-b w-full py-4 text-center font-bold text-2xl font-serif" ] [ text "Inca Kordle" ]


viewGame : List Guess -> Solution -> Int -> Html Msg
viewGame guesses solution maxGuesses =
    createFillerGuesses (List.length guesses + 1) maxGuesses
        |> List.append guesses
        |> List.map viewGuess
        |> div [ class "mx-auto my-8 max-w-md text-sm" ]


viewGuess : Guess -> Html Msg
viewGuess guess =
    case guess of
        GuessIdle index ->
            div
                [ class "bg-slate-100 rounded-md px-4 py-2 w-full mb-4 cursor-not-allowed text-gray-300" ]
                [ text <| "Intento #" ++ String.fromInt index ]

        GuessCurrent currentGuess ->
            input
                [ type_ "text"
                , class "border rounded-md px-4 py-2 w-full mb-4"
                , value currentGuess
                , Attr.placeholder "Enter a guess"
                , Evts.onInput CurrentGuessUpdated
                ]
                []

        GuessFinished userGuess _ ->
            div
                [ class "bg-green-200 rounded-md px-4 py-2 w-full mb-4" ]
                [ text userGuess ]



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
        |> List.map (\index -> GuessIdle index)
