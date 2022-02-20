module Main exposing (main)

import Browser
import Html exposing (Html, button, div, h1, nav, p, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
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
    | Loaded String (List String)



-- UPDATE


type Msg
    = GotResponse (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResponse res ->
            case res of
                Ok solution ->
                    ( Loaded solution [], Cmd.none )

                Err _ ->
                    -- currently no need to pattern match on the error cause
                    ( Failed "unable to fetch today's word", Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            p [] [ text "Loading..." ]

        Failed errorMsg ->
            p [] [ text errorMsg ]

        Loaded solution _ ->
            div []
                [ viewHeader model
                , viewGame model
                ]


viewHeader : Model -> Html msg
viewHeader _ =
    nav [ class "border-b w-full py-4 text-center font-bold text-2xl font-serif" ] [ text "Inca Kordle" ]


viewGame : Model -> Html Msg
viewGame model =
    div [ class "mx-auto my-8 max-w-md border" ] [ text "Game here" ]



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
