"use strict";
import * as vscode from "vscode";

let ext_prefix = "autoDayNightThemeSwitcher";
let theme_key = "workbench.colorTheme";

const user_config = vscode.workspace.getConfiguration();
let extension_config;
let night_theme, day_theme;
let night_theme_customizations, day_theme_customizations;
let auto_toggle, auto_toggle_time_night_begin, auto_toggle_time_night_end;
let auto_toggle__time_begin_hours = 19;
let auto_toggle__time_begin_mins = 0;
let auto_toggle__time_end_hours = 7;
let auto_toggle__time_end_mins = 0;

function updateSettings() {
  extension_config = vscode.workspace.getConfiguration("autoDayNightThemeSwitcher");
  night_theme = extension_config.nightTheme;
  day_theme = extension_config.dayTheme;
  night_theme_customizations = extension_config.nightThemeCustomizations;
  day_theme_customizations = extension_config.dayThemeCustomizations;
  auto_toggle = extension_config.autoToggle;
  auto_toggle_time_night_begin = extension_config.autoToggleTimeNightBegin;
  auto_toggle_time_night_end = extension_config.autoToggleTimeNightEnd;
}


function armAutoToggle() {
  _auto_toggle__check_and_maybe_act();
  setInterval(function(){_auto_toggle__check_and_maybe_act();}, 10000);
}

function _auto_toggle__check_and_maybe_act() {
  if(extension_config.autoToggle) {
    let dark_desired = _auto_toggle__check_current_time_dark_desired();

    if(dark_desired && get_current_active_theme() != night_theme) {
      switch_to_night_theme();
      vscode.window.showInformationMessage("Auto Day Night Theme Switcher: Switched to Night Theme");
    }

    if(!dark_desired && get_current_active_theme() != day_theme) {
      switch_to_day_theme();
      vscode.window.showInformationMessage("Auto Day Night Theme Switcher: Switched to Day Theme");
    }
  }
}

function _auto_toggle__check_current_time_dark_desired(){
  let begin_splits = extension_config.autoToggleTimeNightBegin.split(":");
  let end_splits = extension_config.autoToggleTimeNightEnd.split(":");
  auto_toggle__time_begin_hours = begin_splits[0];
  auto_toggle__time_begin_mins = begin_splits[1];
  auto_toggle__time_end_hours = end_splits[0];
  auto_toggle__time_end_mins = end_splits[1];

  let now = new Date();

  let time_begin = new Date();
  time_begin.setHours(auto_toggle__time_begin_hours);
  time_begin.setMinutes(auto_toggle__time_begin_mins);

  let time_end = new Date();
  time_end.setHours(auto_toggle__time_end_hours);
  time_end.setMinutes(auto_toggle__time_end_mins);

  if(time_begin > time_end){
   // time range encompasses midnight ==> swap begin and end and check if we are NOT within time range
   //console.log("Auto Day Night Theme: IN MIDNIGHT ENCOMPASS CASE: !((now < time_begin) && (now >= time_end)): " + (!((now < time_begin) && (now >= time_end))));
   return !((now < time_begin) && (now >= time_end));
  }

  else{
    //console.log("Auto Day Night Theme: without midnight encompass: (now >= time_begin) && (now < time_end): " + ((now >= time_begin) && (now < time_end)));
    return (now >= time_begin) && (now < time_end);
  }
 }


function get_current_active_theme() {
  return vscode.workspace.getConfiguration().get(theme_key);
}

function switch_to_day_theme() {
  user_config.update(theme_key, day_theme, true);
  user_config.update("workbench.colorCustomizations", day_theme_customizations, true);
}

function switch_to_night_theme() {
  user_config.update(theme_key, night_theme, true);
  user_config.update("workbench.colorCustomizations", night_theme_customizations, true);
}


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.workspace.onDidChangeConfiguration(updateSettings, this);
  updateSettings();

  armAutoToggle();

  vscode.commands.registerCommand(ext_prefix + ".switch_to_night_theme", () => {
    switch_to_night_theme();
  });

  vscode.commands.registerCommand(ext_prefix + ".switch_to_day_theme", () => {
    switch_to_day_theme();
  });

  vscode.commands.registerCommand(ext_prefix + ".toggleDayNightTheme", () => {
    if (get_current_active_theme() === day_theme) {
      switch_to_night_theme();
    } else if (get_current_active_theme() === night_theme) {
      switch_to_day_theme();
    } else {
      let toggleDefaultNight = vscode.workspace.getConfiguration().get(ext_prefix + ".toggleDefaultNight");
      if (toggleDefaultNight) {
        switch_to_night_theme();
      } else {
        switch_to_day_theme();
      }
    }
  });

  context.subscriptions.push(disposable);
}

