# Auto Day Night Theme Switcher

Automatically switch between day and night color themes based on given times.

## Features

![](https://media.giphy.com/media/4Nk6EGaAnNeVi/giphy.gif)

A darker, calmer color theme is better for your eyes during the night. But it's not always convenient during the day. This extension allows you to define daytime and nighttime themes and quickly switch between them.

## Extension Settings

This extension contributes the following settings:

* `autoDayNightThemeSwitcher.autoToggle`: If enabled, toggle to day and night theme automatically given the times (default is `true`)
* `autoDayNightThemeSwitcher.autoToggleTimeNightBegin`: Time when the automatic toggle to the night theme shall be done (if auto-toggle enabled, default is `19:00`)
* `autoDayNightThemeSwitcher.autoToggleTimeNightEnd`: Time when the automatic toggle to the day theme shall be done (if auto-toggle enabled, default is `7:00`)
* `autoDayNightThemeSwitcher.dayTheme`: Day theme (default is `Visual Studio Light`)
* `autoDayNightThemeSwitcher.nightTheme`: Night theme (default is `Visual Studio Dark`)
* `autoDayNightThemeSwitcher.dayThemeCustomizations`: Day theme color customizations (default is `{}`)
* `autoDayNightThemeSwitcher.nightThemeCustomizations`: Night theme color customizations (default is `{}`)
* `autoDayNightThemeSwitcher.toggleDefaultNight`: If neither day or night theme are the current theme and toggle is triggered, switch to night theme (default is `true`)

## Release Notes

### 0.2.0

Auto Day Night Theme Switcher with auto toggle feature

## Credits

Day Night Theme Switcher by Rakhim Davletkaliyev (https://github.com/freetonik/vscode-dnts).

Night and day by Aaron K. Kim from the Noun Project.
