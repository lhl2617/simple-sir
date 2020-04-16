import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MobileDetect from 'mobile-detect';
import { modelKeys } from '../../utils/defs';

interface IProps {
}

interface IState {
    navExpanded: boolean;
}


export class Header extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            navExpanded: false,
        }
    }

    expandNav = () => {
        const { navExpanded } = this.state;
        if (!navExpanded) {
            this.setState({
                ...this.state,
                navExpanded: true,
            });
        }
    }

    closeNav = () => {
        const { navExpanded } = this.state;
        if (navExpanded) {
            this.setState({
                ...this.state,
                navExpanded: false,
            })
        }
    }

    getNavElems = () => {
        const md = new MobileDetect(window.navigator.userAgent);

        // let iPhone reload so that it resets audio context. What cancer.
        if (md.mobile() === "iPhone") {
            return (
                <Nav>
                    {modelKeys.map((id: string) => <Nav.Link href={`/${id.toLocaleLowerCase()}`} key={id}>{id}</Nav.Link>)}
                </Nav>
            );
        }
        return (
            <Nav>
                {modelKeys.map((id: string) =>  <LinkContainer to={`/${id.toLocaleLowerCase()}`} onClick={this.closeNav} key={id}>
                    <Nav.Link>{id}</Nav.Link>
                </LinkContainer>)}
            </Nav>
        );
    }
    render() {
        const { navExpanded } = this.state;
        return (
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg" onToggle={this.expandNav} expanded={navExpanded}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.closeNav} />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto" />
                    {this.getNavElems()}
                </Navbar.Collapse>
            </Navbar>
        );
    };
}

export default Header;