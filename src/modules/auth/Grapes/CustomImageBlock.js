import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Col, Input, Row, Button } from 'antd';

import { generateSelectUI } from './util';

const CustomImageBlock = (editor) => {
  editor.DomComponents.addType('custom-img', {
    isComponent: (el) => el.tagName === 'a',
    extends: 'image',
    model: {
      // Default properties
      defaults: {
        tagName: 'a',
        attributes: {
          // Default attributes
          href: 'http://soaica.dev/',
        },
        traits: ['href'],
        components: [
          {
            tagName: 'img',
            attributes: {
              src: 'https://i.pinimg.com/originals/c6/9f/e1/c69fe13923071f4d491be72790d11ff8.jpg',
              width: 50,
              height: 50,
            },
            traits: ['src'],
            content: '',
          },
        ],
      },
    },
  });

  const blockManager = editor.BlockManager;
  blockManager.add('custom-image-block', {
    label: 'Custom image',
    content: {
      type: 'custom-img',
    },
    activate: true,
  });

  const commands = editor.Commands;

  const modal = (
    <>
      <Row gutter="16">
        <Col span="12">
          <label>Href</label>
          <Input id="custom-img-href" />
        </Col>
        <Col span="12">
          <label>Source Tag</label>
          {generateSelectUI('custom-img-src')}
        </Col>
      </Row>
      <br />
      {/* <Row gutter="16" justify="end">
        <Col>
          <Button id="custom-modal-ok">Ok</Button>
        </Col>
      </Row>
      <br /> */}
    </>
  );

  commands.add('command-modal-image', {
    run(editor) {
      editor.Modal.open({
        title: 'Custom Image',
        content: ReactDOMServer.renderToString(modal),
      }).onceClose(() => this.stopCommand());

      // document
      //   .getElementById('custom-modal-ok')
      //   .addEventListener('click', () => {
      //     document.getElementsByClassName('gjs-mdl-btn-close')[0].click();
      //   });

      document
        .getElementById('custom-img-href')
        .addEventListener('change', ({ target }) => {
          const component = editor.getSelected();
          component.updateTrait('href', {
            value: target.value,
          });
          component.setAttributes({ href: target.value });
        });

      document
        .getElementById('custom-img-src')
        .addEventListener('change', ({ target }) => {
          const component = editor.getSelected();
          const allImages = component.find('img')[0];
          allImages.updateTrait('src', {
            value: target.value,
          });
          allImages.setAttributes({ src: target.value });
        });
    },
  });

  editor.on('block:drag:stop', (some, argument) => {
    if (some && argument.attributes.label === 'Custom image') {
      editor.runCommand('command-modal-image');
      const component = editor.getSelected();
    }
  });
};

export default CustomImageBlock;
