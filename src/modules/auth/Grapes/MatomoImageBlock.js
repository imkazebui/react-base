import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Col, Input, Row } from 'antd';

const MatomoImageBlock = (editor) => {
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
          <Input id="custom-img-href" />
        </Col>
        <Col span="12">
          <label>Uid</label>
          <select name="cars" id="custom-img-src">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </Col>
      </Row>
      <br />
      <Row gutter="16">
        <Col span="12">
          <label>Site id</label>
          <Input id="custom-img-href" />
        </Col>
        <Col span="12">
          <label>Url root</label>
          <Input id="custom-img-href" />
        </Col>
      </Row>
      <br />
      <Row gutter="16">
        <Col span="12">
          <label>Record Campaign Name</label>
          <Input id="custom-img-href" />
        </Col>
        <Col span="12">
          <label>Record Campaign Key</label>
          <Input id="custom-img-href" />
        </Col>
      </Row>
      <br />
      <Row gutter="16">
        <Col span="12">
          <label>Action Name</label>
          <Input id="custom-img-href" />
        </Col>
        <Col span="12">
          <label>Cvar</label>
          <Input id="custom-img-href" />
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
    if (some && argument.attributes.label === 'Matomo image') {
      editor.runCommand('command-modal-matomo-image');
      const component = editor.getSelected();
    }
  });
};

export default MatomoImageBlock;
