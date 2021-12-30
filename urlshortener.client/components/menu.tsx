import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, Col, Nav, Row } from 'react-bootstrap'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from "next/router";

const Menu: NextPage = ({ children }) => {
  const [active, setActive] = useState('default');
  const router = useRouter();

  return (<>
    <Row className="mx-0">
      <Nav variant="tabs" justify
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
      >
        <Nav.Item>
          <Link href='/shortenurl' >
            <Nav.Link eventKey='/shortenurl' href='/shortenurl' className={router.pathname == "/shortenurl" ? "active" : ""}>
              Url Shorten
            </Nav.Link>
          </Link>

        </Nav.Item>
        <Nav.Item>
          <Link href='/urladmin'>
            <Nav.Link eventKey='/urladmin' href='/urladmin' className={router.pathname == "/urladmin" ? "active" : ""}>
              Url Admin
            </Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
    </Row>
  </>)
}
export default Menu