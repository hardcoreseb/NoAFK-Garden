# 🌻 NoAFK Garden

A lightweight browser extension that prevents AFK detection on **magicgarden.gg** by forcing the page to always appear active and visible.

Leave your game running safely in the background while you focus on other tasks.

## Features

* **AFK Protection**

  * Overrides `document.hidden` and `document.visibilityState`
  * Ensures the page is always treated as **visible** and in **focus**.

## How It Works

The extension prevents AFK detection by redefining browser visibility APIs:

* `document.hidden → false`
* `document.visibilityState → 'visible'`

It also overrides these values on the `Document.prototype`, ensuring that even deeper checks from the game cannot detect tab inactivity.

## Installation (Manual)

1. Download or clone this repository
2. Open Chrome and navigate to:

   ```
   chrome://extensions/
   ```
3. Enable **Developer Mode** (top right)
4. Click **Load unpacked**
5. Select the `NoAFK-Garden` folder


## Installation (Automatic)
1. Visit the chrome web store (WIP)

## Permissions

* `scripting` – inject scripts into the page
* `tabs` – detect and interact with open tabs
* `storage` – reserved for future settings

## Roadmap

* Extended Logging (Check and filter all logged activities)
* Notification handling (Set up a notification handler for all your needed notifications)

## Disclaimer

This extension follows the [policy for mods & scripts](https://discord.com/channels/808935495543160852/1428205518278885457/1428205518278885457) of the creators of MagicGarden.

Use at your own risk.
