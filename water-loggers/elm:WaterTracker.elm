module Main exposing (..)

import Browser
import Html exposing (Html, div, text, button, input, h1, p)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode

type alias Model =
    { waterIntake : Int
    , inputAmount : String
    }

type Msg
    = AddWater
    | UpdateInput String
    | ResetWater

init : () -> ( Model, Cmd Msg )
init _ =
    ( { waterIntake = 0, inputAmount = "" }, Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddWater ->
            let
                amount =
                    String.toInt model.inputAmount |> Maybe.withDefault 0
            in
            if amount > 0 then
                ( { model | waterIntake = model.waterIntake + amount, inputAmount = "" }, Cmd.none )
            else
                ( model, Cmd.none )

        UpdateInput newInput ->
            ( { model | inputAmount = newInput }, Cmd.none )

        ResetWater ->
            ( { model | waterIntake = 0, inputAmount = "" }, Cmd.none )

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Water Tracker" ]
        , p [] [ text ("Total water Intake: " ++ String.fromInt model.waterIntake ++ " ml") ]
        , input [ placeholder "Enter amount in ml", value model.inputAmount, onInput UpdateInput ] []
        , button [ onClick AddWater ] [ text "Add Water (Press Enter)" ]
        , button [ onClick ResetWater ] [ text "Reset Water Intake" ]
        ]

main : Program () Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
