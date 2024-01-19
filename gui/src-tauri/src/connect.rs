use std::process::{Command, Output, Stdio};

use serde::Serialize;

#[derive(Serialize)]
pub struct ConnectOutput {
    error: String,
}

#[tauri::command]
pub fn connect(station: String, network: String, password: String) -> ConnectOutput {
    let connection_result: Output = Command::new("iwctl")
        .arg("station")
        .arg(station)
        .arg("connect")
        .arg(network)
        .arg("--passphrase")
        .arg(password)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .unwrap();

    let stdout = String::from_utf8(connection_result.stdout).unwrap();
    ConnectOutput { error: stdout }
}
