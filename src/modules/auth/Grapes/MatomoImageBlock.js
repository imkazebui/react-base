import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Col, Input, Row, Button } from 'antd';
import axios from 'axios';

import { generateSelectUI, getElVal } from './util';

const MatomoImageBlock = (editor) => {
  try {
    axios.get('https://api.publicapis.org/entries').then((data) => {
      handleLogic(data);
    });
  } catch (err) {
    console.log('err', err);
  }

  const handleLogic = (data) => {
    editor.DomComponents.addType('matomo-img', {
      isComponent: (el) => el.tagName === 'IMG',
      extends: 'image',
      model: {
        // Default properties
        defaults: {
          tagName: 'img',
          attributes: {
            // Default attributes
            alt: '',
            referrerpolicy: 'no-referrer-when-downgrade',
            src: "https://analytics.dev.syd.darkwing.io/matomo.php?uid={{|client_customer_id|}}&idsite=32&rec=1&bots=1&url=https%3A%2F%2Fpetstock.engage.qa.syd.darkwing.io&action_name=email_opened&_rcn=Horse%20Birthday%20Campaign&_rck=email_tracking&_cvar={'1':['OS','iphone 5.0'],'2':['Matomo Mobile Version','1.6.2'],'3':['Locale','en::en'],'4':['Num Accounts','2']}&apiv=1",
            id: 'il8x',
            width: 100,
            style: 'border: 0; width: 1px; box-sizing: border-box;',
          },
          traits: ['src', 'width', 'style'],
        },
      },
    });

    const blockManager = editor.BlockManager;
    blockManager.add('matomo-image-block', {
      label: 'Matomo image',
      content: {
        type: 'matomo-img',
      },
      activate: true,
    });

    const commands = editor.Commands;

    const modal = (
      <>
        <Row gutter="16">
          <Col span="12">
            <label>Matomo root link</label>
            <Input id="rootLink" />
          </Col>
          <Col span="12">
            <label>Uid</label>
            {generateSelectUI('uid')}
          </Col>
        </Row>
        <br />
        <Row gutter="16">
          <Col span="12">
            <label>Site id</label>
            <Input id="idsite" />
          </Col>
          <Col span="12">
            <label>Url root</label>
            <Input id="url" />
          </Col>
        </Row>
        <br />
        <Row gutter="16">
          <Col span="12">
            <label>Record Campaign Name</label>
            <Input id="_rcn" />
          </Col>
          <Col span="12">
            <label>Record Campaign Key</label>
            <Input id="_rck" />
          </Col>
        </Row>
        <br />
        <Row gutter="16">
          <Col span="12">
            <label>Action Name</label>
            <Input id="action_name" />
          </Col>
          <Col span="12">
            <label>Cvar</label>
            <Input id="_cvar" />
          </Col>
        </Row>
        <br />
        <Row gutter="16" justify="end">
          <Col>
            <Button id="custom-modal-ok">Ok</Button>
          </Col>
        </Row>
        <br />
      </>
    );

    commands.add('command-modal-matomo-image', {
      run(editor) {
        editor.Modal.open({
          title: 'Matomo Image',
          content: ReactDOMServer.renderToString(modal),
        }).onceClose(() => this.stopCommand());

        document
          .getElementById('custom-modal-ok')
          .addEventListener('click', () => {
            // get data from input

            const data = {
              rootLink: getElVal('rootLink'),
              uid: getElVal('uid'), // da co
              idsite: getElVal('idsite'), // da co
              rec: 1,
              bots: 1,
              url: getElVal('url'), // da co
              action_name: getElVal('action_name'), // da co
              _rcn: getElVal('_rcn'), // da co
              _rck: getElVal('_rck'), // da co
              _cvar: getElVal('_cvar'), // da co
              apiv: 1,
            };

            let src = Object.keys(data)
              .map((k) => {
                if (k === 'rootLink') {
                  return `{rootLink}`;
                }
                return `${k}={${k}}`;
              })
              .join('&')
              .replace('&', '?');

            Object.entries(data).map(([key, value]) => {
              src = src.replace(`{${key}}`, value);
            });

            const component = editor.getSelected();
            component.updateTrait('src', {
              value: src,
            });
            component.setAttributes({ src });

            // close modal
            document.getElementsByClassName('gjs-mdl-btn-close')[0].click();
          });
      },
    });

    editor.on('block:drag:stop', (some, argument) => {
      if (some && argument.attributes.label === 'Matomo image') {
        editor.runCommand('command-modal-matomo-image');
        const component = editor.getSelected();
      }
    });
  };
};

export default MatomoImageBlock;
