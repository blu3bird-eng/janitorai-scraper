# JanitorAI Chat Scraper

A lightweight, browser-based tool to extract and export messages from JanitorAI chats with precision.

Built for roleplayers, writers, and anyone who wants **clean, structured access to their conversations** without fighting the UI.

## Features

- Extract messages directly from the live chat DOM  
- Select specific messages (not just full dumps)  
- Export entire conversations instantly  
- Clean text output (no UI junk, avatars, or buttons)  
- Hover-to-highlight matching messages in the chat  
- Works entirely in-browser (no extensions, no installs)

## Why This Exists

JanitorAI doesn’t provide:
- clean export tools  
- selective message extraction  
- structured conversation output  

So this fills that gap.

Instead of scraping blindly, this tool:
> identifies actual message containers and extracts only meaningful text

## How to Use

1. Open a JanitorAI chat  
2. Open DevTools (`F12`)  
3. Go to the **Console**  
4. Paste the script  
5. Hit enter  

You’ll see a panel appear in the top-right.

## Controls

- **Scan** → Finds all messages in the chat  
- **Select All** → Selects every message  
- **Clear** → Clears selection  
- **Export Selected** → Exports only checked messages  
- **Export All** → Dumps entire conversation  
- **Copy** → Copies output to clipboard  

## Output Format

Plain text, clean and readable

## Limitations

- Depends on JanitorAI’s DOM structure  
- May need selector updates if the site changes  
- Only captures currently loaded messages (no auto-scroll yet)

## Disclaimer

This tool runs locally in your browser and does not send data anywhere.

