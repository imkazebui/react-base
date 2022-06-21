import { saveAs } from 'file-saver';

export const getBase64 = (file) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const blob = await fetch(`data:${dataType};base64,${str}`).then((res) => res.blob());
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

/**
 * TODO: need to re-check
 */
export const bytesToMB = (bytes) => bytes / 1024 ** 2;

// Can use for get dimension of image
export const getFileFromUrl = async (url) => {
  const file = await fetch(url).then((r) => r.blob());
  return file;
};

/**
 * TODO: re-check
 */
export const getImageDimensionsFromFile = (file) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    const img = new Image();
    const newFile = file;
    img.onload = () => {
      newFile.dimensions = [this.width, this.height].join('x');
      newFile.width = this.width;
      newFile.height = this.height;
      resolve(newFile);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = URL.createObjectURL(newFile);
  });

/**
 * TODO: need check
 */
const calculateGCD = () => {};

export const getVideoMetadataFromFile = (file) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      const ratio = calculateGCD(video.videoWidth, video.videoHeight);

      const videoInfo = {
        duration: Math.floor(video.duration),
        ratio: `${video.videoWidth / ratio}:${video.videoHeight / ratio}`,
      };
      resolve(videoInfo);
    };

    video.onerror = (err) => {
      reject(err);
    };

    video.src = URL.createObjectURL(file);
  });
