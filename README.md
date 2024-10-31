# dimusco-preview-crawler
A browser script to download the preview pictures of dimusco scores.

## Usage

- copy the source code and paste it into the chrome dev console
- type ``start()`` and enter to run the ``start`` function
- you will be prompted to select a download directory
- you will be prompted to grant the script read and write access to this directory
- the download will start and each page will be saved as ``x.png`` into the download directory where ``x`` is the page number
- the download will stop automatically after the last page was downloaded
- to stop the download manually, type ``running = false`` and enter or reload the browser tab
- after the browser tab was reloaded, the source code has to be pasted again

## Troubleshooting

- if an error occurs (sometimes the preview page just won't cooperate) rerun the ``start()`` function, the download will start from the currently selected page (make sure the correct page is visible)
- if the dimusco server responds with an 429 (too many request) error, try reloading the page in a different tab, if that does not work, just wait a few hours or use a VPN to continue

## Note
Do not use on material protected by copyright!
