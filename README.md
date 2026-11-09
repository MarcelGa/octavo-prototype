# Octavo prototype

A clickable phone prototype of Octavo: Home, a 3-question "Today's mix" lesson (circuits, Spanish, anatomy), the lesson-complete screen and the "nine brains" progress screen.

It's plain HTML, CSS and JavaScript with no build step and no dependencies. Progress (ink drops, streak) is remembered in the browser; use **Reset demo** at the bottom of the Profile screen to start over.

## Run it on your computer and share it on your Wi-Fi

From the repository root:

```bash
node scripts/serve.mjs
```

It prints two addresses:

- `http://localhost:8080` for this computer
- `http://192.168.x.x:8080` for any phone or laptop on the same Wi-Fi

The first time, Windows Firewall may ask whether Node.js can accept connections. Allow it on **private networks**. Stop the server with `Ctrl+C`.

Use a different port with `node scripts/serve.mjs prototype 3000`.

## Put it on the phone's home screen

Open the address on your phone, then:

- **iPhone (Safari):** Share › Add to Home Screen
- **Android (Chrome):** ⋮ menu › Add to Home screen

It opens full screen with the Otto icon, like an app.

## Host it on GitHub Pages

1. Push the repository to GitHub.
2. In the repo, open **Settings › Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your branch (`main`) and the **`/ (root)`** folder, then **Save**.
4. After a minute the prototype is at `https://<your-username>.github.io/<repo-name>/prototype/`.

GitHub Pages is free for public repositories; a private repository needs a paid plan (e.g. GitHub Pro). The published site is visible to anyone who has the link.

## Notes

- Fonts (Fredoka, Nunito) load from Google Fonts. Without internet access the prototype falls back to the system font and still works.
- The subjects, levels and stats are sample data for the demo.
