import { saveAs } from 'file-saver';

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const getFileExtension = (fileName) => {
  if (!fileName) {
    return {};
  }
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  const name = fileName.replace(/\.[^/.]+$/, '');
  return { extension, name };
};

export const normFile = (e, key = 'fileList') => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e[key];
};

export const downloadFileFromBase64 = (dataType) => async (str, name) => {
  const blob = await fetch(`data:${dataType};base64,${str}`).then((res) =>
    res.blob()
  );
  const url = URL.createObjectURL(blob);
  saveAs(url, `${name}`);
};

export const downloadCsvFromBase64 = downloadFileFromBase64('text/csv');

export const bytesToSize = (bytes) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const bytesToMB = (bytes) => {
  return bytes / Math.pow(1024, 2);
};

// Can use for get dimension of image
export const getFileFromUrl = async (url) => {
  const file = await fetch(url).then((r) => r.blob());
  return file;
};

export const getImageDimensionsFromFile = (file) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = function () {
      file.dimensions = [this.width, this.height].join('x');
      file.width = this.width;
      file.height = this.height;
      resolve(file);
    };
    img.onerror = function (err) {
      reject(err);
    };
    img.src = URL.createObjectURL(file);
  });
};

export const getVideoMetadataFromFile = (file) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      URL.revokeObjectURL(video.src);
      const ratio = calculateGCD(video.videoWidth, video.videoHeight);

      const videoInfo = {
        duration: Math.floor(video.duration),
        ratio: `${video.videoWidth / ratio}:${video.videoHeight / ratio}`,
      };
      resolve(videoInfo);
    };

    video.onerror = function (err) {
      reject(err);
    };

    video.src = URL.createObjectURL(file);
  });
};
