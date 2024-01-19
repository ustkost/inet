use serde;
use std::process::{Command, Output, Stdio};

#[derive(serde::Serialize)]
pub struct Station {
    name: String,
    connected: bool,
}

fn get_station_list() -> String {
    let station_list: Output = Command::new("iwctl")
        .arg("station")
        .arg("list")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .unwrap();

    let output = String::from_utf8(station_list.stdout).unwrap();
    output
}

fn parse_station_list(stations: String) -> Vec<Station> {
    let raw_lines: Vec<&str> = stations.split("\n").collect();
    let lines: Vec<&str> = raw_lines[4..raw_lines.len() - 2].to_vec();

    let mut res: Vec<Station> = Vec::new();

    for line in lines {
        let splitted_line = line.split_whitespace().collect::<Vec<&str>>();
        if let [_, station, status] = splitted_line[..] {
            let bool_status: bool = match status {
                "connected" => true,
                "disconnected" => false,
                _ => false,
            };

            res.push(Station {
                name: String::from(station),
                connected: bool_status,
            });
        }
    }

    res
}

#[tauri::command]
pub fn get_stations() -> Vec<Station> {
    parse_station_list(get_station_list())
}
