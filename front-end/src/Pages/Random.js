import { useEffect, useState } from 'react';
import { ContainerRandom, WrapperImage } from '../Styled/StyledRandom';

function Random() {
  const [dogs, setDogs] = useState('');
  const [loading, setLoading] = useState(false);

  const requestApi = async () => {
    setLoading(true);
    const request = await fetch('https://random.dog/woof.json');
    const dataJson = await request.json();
    const data = dataJson && dataJson.url;

    setDogs(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!dogs.length) {
      requestApi();
    }
  }, [dogs]);

  return (
    <ContainerRandom>
      <WrapperImage>
        {
          loading ? (
            <p>Loading ...</p>
          ) : <img src={ dogs } alt="Random dogs" />
        }
      </WrapperImage>
      <button
        type='button'
        onClick={ requestApi }
      >
        Refresh
      </button>
    </ContainerRandom>
  )
}

export default Random;
