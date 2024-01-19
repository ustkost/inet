#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod connect;
mod disconnect;
mod get_networks;
mod get_stations;

use connect::connect;
use disconnect::disconnect;
use get_networks::get_networks;
use get_stations::get_stations;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            connect,
            disconnect,
            get_stations,
            get_networks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
