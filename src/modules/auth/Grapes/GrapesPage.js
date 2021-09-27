import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { Form, Col } from 'antd';

import grapesjs from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';

import 'grapesjs/dist/css/grapes.min.css';
import './styles.scss';

const CustomImage = (editor) => {
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
      // updated(property, value, prevValue) {
      //   console.log(
      //     'Local hook: model.updated',
      //     'property',
      //     property,
      //     'value',
      //     value,
      //     'prevValue',
      //     prevValue
      //   );
      // },
    },

    // view: {
    //   onRender() {
    //     console.log('Local hook: view.onRender');
    //     editor.runCommand('command-modal-image');
    //   },
    // },
  });
};

const GrapesPage = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      fromElement: 1,
      container: '#gjs',
      plugins: ['gjs-blocks-basic', CustomImage],
    });

    const blockManager = editor.BlockManager;
    blockManager.add('my-first-block', {
      label: 'Custom image',
      content: {
        type: 'custom-img',
      },
      activate: true,
    });

    const commands = editor.Commands;

    const modal = (
      <div>
        <input id="custom-img-href"></input>
        <input id="custom-img-src"></input>
      </div>
    );

    commands.add('command-modal-image', {
      run(editor) {
        editor.Modal.open({
          title: 'Modal example',
          content: ReactDOMServer.renderToString(modal),
        }).onceClose(() => this.stopCommand());

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
  }, []);

  return (
    <>
      <div id="gjs"></div>
    </>
  );
};

export default GrapesPage;
