# jorno - The Journaling App

<p align="center">
<img src="src/lib/img/jornofulllight.svg" alt="drawing" width=360px />
</p>

Built with [Tauri](https://tauri.app/), [Svelte](https://svelte.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).

## Demonstrations
### Video
<a href="https://youtu.be/cQ_3U-2O6Bo">
<img src="./images/youtube_thumbnail_with_visual_cue.png" alt="YouTube video demonstrating the jorno application" width=70% />
</a>

### Images
#### Editing
<details>
<summary>View of the window where a jorno file can be edited</summary>
<img src="./images/jorno_demo_file.png" alt="Screenshot of jorno file being edited" width=70% />
</details>

<details>
<summary>View of the window when a section is hovered, showing the buttons to add more sections</summary>
<img src="./images/jorno_demo_add.png" alt="Screenshot of a section being hovered in a jorno file being edited" width=70% />
</details>

<details>
<summary>View of the window when an image is hovered, showing a zoom slider, a URL input and a upload from disk options</summary>
<img src="./images/jorno_demo_image_edit.png" alt="Screenshot of an image being hovered in a jorno file being edited" width=30%>
</details>

#### Theme Modes
The theme mode can be changed by hovering and clicking on the peeking button on the bottom right corner.
<details>
<summary>View of the main menu when the theme mode is based on the system preference</summary>
<img src="./images/jorno_demo_system_theme.png" alt="Screenshot of the main menu in system preference mode" width=70% />
</details>

<details>
<summary>View of the main menu when the dark mode is used</summary>
<img src="./images/jorno_demo_dark_theme.png" alt="Screenshot of the main menu in dark mode" width=70% />
</details>

<details>
<summary>View of the main menu when the light mode is used</summary>
<img src="./images/jorno_demo_light_theme.png" alt="Screenshot of the main menu in light mode" width=70% />
</details>

<details>
<summary>View of a jorno file being edited in light mode</summary>
<img src="./images/jorno_demo_light_theme_edit.png" width=70% />
</details>

## Building from source
1. [Install Tauri's prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
2. Install the npm packages using `npm i`
3. Run in developer mode `npx tauri dev` or build the bundle using `npx tauri build`. 

### Known bugs
Windows Defender and [VirusTotal](https://www.virustotal.com) will flag the (`.msi`) bundle and its installation file as a threat containing inter alia a Trojan `Trojan:Script/Wacatac.B!ml`. The issue is tracked in tauri-apps/tauri#2486 on Tauri's repository.