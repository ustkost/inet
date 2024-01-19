use std::process::{Command, Stdio};

#[tauri::command]
pub fn disconnect(station: String) -> () {
    Command::new("iwctl")
        .arg("station")
        .arg(station)
        .arg("disconnect")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .output()
        .unwrap();
    ()
}
