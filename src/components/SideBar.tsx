import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

export const SideBar = () => {
	return (
		<StyledMainContainer>
			<StyledNavLink to='/'>
				{/* <House /> */} <span>Home</span>
			</StyledNavLink>
			<StyledNavLink to='/'>
				{/* <House /> */} <span>TCs</span>
			</StyledNavLink>
			<StyledNavLink to='/'>
				{/* <House /> */} <span>Gastos</span>
			</StyledNavLink>

		</StyledMainContainer>
	)
}


const StyledMainContainer = styled.div`
  background-color: #252525;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  min-width: 4.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--main-color);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
  }

  span {
    position: relative;
    bottom: 0.1rem;
    font-size: 1rem;
  }


  &:hover {
    color: var(--main-color);
  }
  &.active {
    font-weight: bold;
    filter: brightness(1.5);
  }
`;
