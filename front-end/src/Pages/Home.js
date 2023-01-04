import { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {
  HomeContainer,
  SectionInput,
  ConatinerUsers,
  WrapperUsers,
  WrapperButton,
  ButtonSpace
} from '../Styled/StyledHome';

function Home() {
  const [Users, setUsers] = useState([]);
  const [search, setSearch] = useState(null);
  const [idSearch, setIdSearch] = useState(null);
  const [searchingOne, setSearchingOne] = useState(false);

  const requestApi = async (id) => {
    setIdSearch(id);
    const request = await fetch(`https://randomuser.me/api/?page=${id}&results=10&seed=abc`);
    const dataJson = await request.json();
    const data = dataJson && dataJson.results;

    setUsers(data);
  };

  useEffect(() => {
    if (!Users.length) {
      requestApi();
    }

    if (search !== null) {
      if (!search.length) {
        requestApi(idSearch);
        setSearch(null);
        setSearchingOne(false);
      }
    }
  }, [Users, search, idSearch]);

  const handleSearch = () => {
    const searching = Users.filter(({ email, name, login }) => {
      if (name.first === search || email === search || login.username === search) {

        return search;
      }
      return '';
    });
    setSearchingOne(true);
    setUsers(searching);
  };

  return (
    <HomeContainer>
      <section>
        <SectionInput>
          <label htmlFor='search-id'>
            <input
              type='text'
              value={ search }
              onChange={ ({ target }) => setSearch(target.value) }
              placeholder="Search user"
              id='search-id'
            />
          </label>
          <button
            type='submit'
            onClick={ handleSearch }
          >
            { <BiSearchAlt title='search' /> }
          </button>
        </SectionInput>
        {
          Users.map((user, index) => {
            const pictutes = user.picture.large;
            const fullnames = `name: ${user.name.first} ${user.name.last}`;
            const emails = `email: ${user.email}`;
            const usernames = `username: ${user.login.username}`;
            const ages = `age: ${user.dob.age}`;

            return (
              <ConatinerUsers key={ index }>
                <img src={ pictutes } alt='Images' />
                <WrapperUsers>
                  <p>{ fullnames }</p>
                  <p>{ emails }</p>
                  <p>{ usernames }</p>
                  <p>{ ages }</p>
                </WrapperUsers>
              </ConatinerUsers>
            );
          })
        }
        <WrapperButton>
          {
            !searchingOne ? (
              [1,2,3,4].map((value, index) => {
                return (
                  <ButtonSpace key={ index }>
                    <button
                      title='buttonsPage'
                      type='button'
                      onClick={ () => requestApi(value) }
                    >
                      {value}
                    </button>
                  </ButtonSpace>
                )
              })
            ) : null
          }
        </WrapperButton>
      </section>
    </HomeContainer>
  );
}

export default Home;
