import { faCreditCard, faHome, faFileInvoiceDollar, faTimeline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

export const SideBar = () => {
	return (
		<StyledMainContainer>
			<StyledNavLink to='/'>
      <FontAwesomeIcon icon={faHome} /> <span>Home</span>
			</StyledNavLink>
			<StyledNavLink to='/credit-cards/'>
				<FontAwesomeIcon icon={faCreditCard} /> <span>TCs</span>
			</StyledNavLink>
			<StyledNavLink to='/expenses'>
				<FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Gastos</span>
			</StyledNavLink>
			<StyledNavLink to='/payments'>
				<FontAwesomeIcon icon={faTimeline} /> <span>Payments</span>
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
  min-height: 100%;
  row-gap: 1.0rem;
`;

const StyledNavLink = styled(NavLink)`
  color: green;
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
    color: greenyellow;
  }
  &.active {
    font-weight: bold;
    filter: brightness(1.5);
  }
`;
