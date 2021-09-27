import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { Form, Col } from 'antd';

import grapesjs from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';

import 'grapesjs/dist/css/grapes.min.css';
import './styles.scss';
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css';
import '@yaireo/tagify/dist/tagify.polyfills.min.js'


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
      // content: {
      //   tagName: 'a',
      //   attributes: { href: 'href-default' },
      //   components: [
      //     {
      //       tagName: 'img',
      //       attributes: { src: 'tagname' },
      //       content: 'h1 content',
      //     },
      //   ],
      // },
      activate: true,
    });

    const commands = editor.Commands;

    const modal = (
      <div>
        <input id="custom-img-href"></input>
        <input id="custom-img-src"></input>
        <input id="tag" placeholder="tags" />
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
          });

        var input = document.getElementById('tag');
        var tagify = new Tagify(input, { whitelist: [] });
        tagify.on('input', onInput)

        function onInput(e) {
          var value = e.detail.value
          tagify.whitelist = null // reset the whitelist

          // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
          // controller && controller.abort()
          // controller = new AbortController()

          // show loading animation and hide the suggestions dropdown
          tagify.loading(true).dropdown.hide();

          fetch('https://reqres.in/api/products&value=' + value)
            .then(RES => RES.json())
            .then(function (newWhitelist) {
              console.log("newWhitelist", newWhitelist)
              tagify.whitelist = (newWhitelist.data || []).map(e => e.name); // update inwhitelist Array in-place
              // console.log("tagify.whitelist", tagify.whitelist)

              tagify.loading(false).dropdown.show(value) // render the suggestions dropdown
            })
        }
        document
          .getElementById('custom-img-src')
          .addEventListener('change', ({ target }) => {
            const component = editor.getSelected();
            const allImages = component.find('img')[0];
            allImages.updateTrait('src', {
              value: target.value,
            });
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
