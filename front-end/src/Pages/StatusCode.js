import { useEffect, useState } from 'react';
import options from '../status_code.json';
import { ContainerStatus, WrapperImage } from '../Styled/StyledStatusCode';

function StatusCode() {
  const [images, setImages] = useState('');
  const [value, setValue] = useState('');

  const requestApi = async (status) => {
    if (!status) {
      const response = await fetch(`http://localhost:8010/proxy/100`);

      setImages(response.url);
    } else {
      const response = await fetch(`http://localhost:8010/proxy/${status}`);
  
      setImages(response.url);
    };
  };

  useEffect(() => {
    if (!value.length) {
      requestApi();
    }
    requestApi(value);
  }, [value]);

  return (
    <ContainerStatus>
      <WrapperImage>
        <img src={ images } alt="status_code" />
      </WrapperImage>
      <label htmlFor='id-select'>
        <select
          onChange={ ({ target }) => setValue(target.value) }
          title='select'
          id='id-select'
        >
          {
            options.map(({ status_code }, index) => (
              <option key={ index } value={ status_code }>{status_code}</option>
            ))
          }
        </select>
      </label>
    </ContainerStatus>
  );
}

export default StatusCode;
