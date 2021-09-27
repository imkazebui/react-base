import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { Form, Col } from 'antd';

import grapesjs from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';

import 'grapesjs/dist/css/grapes.min.css';
import './styles.scss';

import CustomImageBlock from './CustomImageBlock';
import MatomoImageBlock from './MatomoImageBlock';

const GrapesPage = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      fromElement: 1,
      container: '#gjs',
      plugins: [CustomImageBlock, MatomoImageBlock, 'gjs-blocks-basic'],
    });
  }, []);

  return (
    <>
      <div id="gjs"></div>
    </>
  );
};

export default GrapesPage;
