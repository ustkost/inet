use serde;
use std::process::{Command, Output, Stdio};

#[derive(serde::Serialize)]
pub struct Network {
    name: String,
    password: bool,
    signal: i32,
    connected: bool,
}

fn get_networks_from_station(station: String) -> String {
    let get_networks: Output = Command::new("iwctl")
        .arg("station")
        .arg(station.clone())
        .arg("get-networks")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .unwrap();

    let stdout = String::from_utf8(get_networks.stdout).unwrap();
    stdout
}

fn signal_to_i32(signal: &str) -> i32 {
    let mut count = 0;
    for char in signal.chars() {
        if char != '*' {
            break;
        }
        count += 1;
    }

    count
}

fn parse_networks_from_station(networks: String) -> Vec<Network> {
    let raw_lines: Vec<&str> = networks.split("\n").collect();
    let lines: Vec<&str> = raw_lines[4..raw_lines.len() - 2].to_vec();

    let mut res: Vec<Network> = Vec::new();
    let mut connected: bool;

    for mut line in lines {
        if line.contains(">") {
            line = &line[21..];
            connected = true;
        } else {
            line = &line[5..];
            connected = false;
        }

        let splitted_line = line.trim_start().split_whitespace().collect::<Vec<&str>>();

        let password = splitted_line[splitted_line.len() - 2];
        let signal = splitted_line[splitted_line.len() - 1];
        let name = splitted_line[..splitted_line.len() - 2].join(" ");

        let bool_password: bool = match password {
            "psk" => true,
            _ => false,
        };

        res.push(Network {
            name: String::from(name),
            password: bool_password,
            signal: signal_to_i32(signal),
            connected,
        });
    }

    res
}

#[tauri::command]
pub fn get_networks(station: String) -> Vec<Network> {
    parse_networks_from_station(get_networks_from_station(station))
}
