import styled from 'styled-components';

import { useForm } from '../hooks/useForm';
import { loginUser } from '../store/slices/auth';
import { useAppDispatch } from '../hooks/reduxHooks';
import { LoginRequest } from '../types/apiTypes/auth';

import '../assets/css/loginPage.css'

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const {
		values: { username, password },
		handleInputChange,
	} = useForm<LoginRequest>({
		username: '',
		password: '',
	});

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(loginUser({ username, password }));
	};

	return (
		<Container>
			<Form onSubmit={(e) => handleLogin(e)}>
				<FormTitle>Inicia Sesión</FormTitle>
				<FormContainer>
					<FormGroup>
						<FormInput
							placeholder=' '
							className='form__input'
							type='text'
							id='username'
							name='username'
							value={username}
							onChange={(e) => handleInputChange(e.target.value, 'username')}
						/>
						<Label className='form__label' htmlFor='username'>
							Usuario
						</Label>
						<FormLine className='form__line' />
					</FormGroup>
					<FormGroup>
						<FormInput
							placeholder=' '
							className='form__input'
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => handleInputChange(e.target.value, 'password')}
						/>
						<Label className='form__label' htmlFor='password'>
							Contraseña
						</Label>
						<FormLine className='form__line' />
					</FormGroup>
					<Button type='submit'>Iniciar Sesión</Button>
				</FormContainer>
			</Form>
		</Container>
	);
};

// TODO: Extraer componentes genericos y revisar animaciones con styled-components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #e5e5f7;
  display: flex;
  align-items: center;
  min-height: 100vh;
`;

const Form = styled.form`
  background-color: white;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 4.5em 3em;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgb(0, 0, 0, 0.3);
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FormContainer = styled.div`
  margin-top: 3em;
  display: grid;
  gap: 2.5em;
`;

const FormGroup = styled.div`
  position: relative;
  --color: #5757577e;
`;

const Label = styled.label`
  color: var(--color);
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 5px;
  transform: translateY(10px);
  transition: transform 0.5s, color 0.3s;
`;

const FormInput = styled.input`
  width: 100%;
  background: none;
  font-family: inherit;
  font-size: 1rem;
  color: #706c6c;
  padding: 0.6em 0.3em;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--color);
`;

const Button = styled.button`
  background-color: crimson;
  color: white;
  font-family: inherit;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.8em 0;
  border: none;
  border-radius: 0.5em;
`;

const FormLine = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--main-color);
  transform: scale(0);
  transform-origin: center;
  transition: transform 0.6s;
`;