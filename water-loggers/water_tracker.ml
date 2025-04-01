(* Water Tracker App *)

let water_intake = ref 0

let log_water amount =
  if amount > 0 then (
    water_intake := !water_intake + amount;
    Printf.printf "Logged %d ml of water. Total intake: %d ml\n" amount !water_intake
  ) else
    Printf.printf "Please enter a positive amount.\n"

let view_total () =
  Printf.printf "Total water intake for today: %d ml\n" !water_intake

let read_positive_int prompt =
  let rec aux () =
    Printf.printf "%s" prompt;
    match read_int_opt () with
    | Some amount when amount > 0 -> amount
    | _ ->
        Printf.printf "Invalid input. Please enter a positive integer.\n";
        aux ()
  in
  aux ()

let rec main () =
  Printf.printf "Water Tracker App\n";
  Printf.printf "1. Log water intake\n";
  Printf.printf "2. View total water intake\n";
  Printf.printf "3. Exit\n";
  Printf.printf "Choose an option: ";
  match read_int_opt () with
  | Some choice ->
      (match choice with
      | 1 ->
          let amount = read_positive_int "Enter amount of water in ml: " in
          log_water amount;
          main ()
      | 2 ->
          view_total ();
          main ()
      | 3 ->
          Printf.printf "Exiting the app. Stay hydrated!\n"
      | _ ->
          Printf.printf "Invalid option. Please try again.\n";
          main ())
  | None ->
      Printf.printf "Invalid input. Please enter a number.\n";
      main ()

let () = main ()
