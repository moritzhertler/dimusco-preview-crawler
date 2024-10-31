function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

function activateSinglePageView() {
	const button = document.querySelector(".switch-preview-mode")

	if (button.children[0].innerHTML == "Single-Sided Presentation") {
		button.click();
		console.log("switched to single page view");
	} else {
		console.log("single page view already active");S
	}
}

async function getDownloadDirectoryHandle() {
	if (!'showOpenFilePicker' in self) {
		throw new Error("File System Access API not supported, please use Chrome 86 or higher!")
	}

	const directoryHandle = await window.showDirectoryPicker();
	await directoryHandle.requestPermission({writable: true});
	return directoryHandle;
}

function next() {
    const button = document.querySelector(".flip-button-right");

	if (button.classList.contains("d-none")) {
		return false;
	}

	button.click();
	return true;
}

async function downloadImage(imageSrc, name, directoryHandle) {
  try {

    const image = await fetch(imageSrc);
    const imageBlob = await image.blob();

	const fileName = `${name}.png`;
	const fileHandle = await directoryHandle.getFileHandle(fileName, {create: true});
	const writable = await fileHandle.createWritable();
	await writable.write(imageBlob);
	await writable.close();

} catch (error) {
	console.error(`Failed to download and safe preview '${fileName}'!`);
    console.error(error);
  }
}

async function download(directoryHandle) {
    await downloadImage(
        document.querySelector(".score-preview__layer-draw-container").children[1].getAttribute("src"),
        document.querySelector(".current-page-number").innerText,
		directoryHandle
    );
}

const TIMEOUT = 500; // ms
let running = true;

async function downloadLoop(directoryHandle) {
    while(running) {
       	await download(directoryHandle);
		await wait(TIMEOUT);
        running = next();
        await wait(TIMEOUT);
    }
}

async function start() {
	activateSinglePageView();
	const directoryHandle = await getDownloadDirectoryHandle();
	downloadLoop(directoryHandle);
}
