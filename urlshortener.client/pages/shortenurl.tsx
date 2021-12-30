import type { NextPage } from 'next'
import Head from 'next/head'
import Menu from '../components/menu'
import styles from '../styles/Home.module.css'
import { Button, Col, Container, Form, Row, Stack, Toast, ToastContainer } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios';
import validator from 'validator';

const ShortenUrl: NextPage = () => {
    const apiUrl = "http://localhost:3000";
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [shortenUrl, setShortenUrl] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleShowToast = () => setShowToast(!showToast);

    const toggleShowError = () => setShowError(!showError);

    const shortenUrlApi = async (): Promise<string> => {
        try {
            const response: AxiosResponse = await axios.post(`${apiUrl}/shortenUrl`, { url });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                console.log(err.response);
            } else if (err.request) {
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            setErrorMessage(err.message);
            toggleShowError();
        }
        return "";
    }

    useEffect(() => {
        if (isLoading) {
            if (url === "") {
                setErrorMessage("Please input url to shorten!");
                toggleShowError();
                setLoading(false);
                return;
            }

            if(!validator.isURL(url)){
                setErrorMessage("Please input valid url!");
                toggleShowError();
                setLoading(false);
                return;
            }

            // Network here
            shortenUrlApi().then((resultUrl) => {
                if (resultUrl !== "") {
                    setShortenUrl(resultUrl);
                    setShowToast(true);
                }
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (<>
        <Head>
            <title>Shorten Url</title>
            <meta name="description" content="Shorten Url" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Menu></Menu>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Shorten Url
            </h1>
            <Container fluid>
                <Row>
                    <Col sm={1} md={2} lg={3}></Col>
                    <Col sm={10} md={8} lg={6}>
                        <Form>
                            <Form.Group className="mb-3" controlId="shortenUrl.ControlInput1">
                                <Form.Control size="lg" type="url" placeholder="https://www.google.com.my" onChange={e => setUrl(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={1} md={2} lg={3}></Col>
                </Row>
                <Row>
                    <Col sm={1} md={2} lg={3}></Col>
                    <Col sm={10} md={8} lg={6}>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Button size="lg" variant="primary" onClick={handleClick}>Shorten</Button>
                        </Stack>
                    </Col>
                    <Col sm={1} md={2} lg={3}></Col>
                </Row>
            </Container>
        </main>
        <ToastContainer position="middle-center" className="p-3">
            <Toast show={showToast} onClose={toggleShowToast} bg="light">
                <Toast.Header>
                    <strong className="me-auto">Link Generated!</strong>
                </Toast.Header>
                <Toast.Body>Your new url is <b>{shortenUrl}</b></Toast.Body>
            </Toast>
            <Toast show={showError} onClose={toggleShowError} bg="danger" delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    </>)
}
export default ShortenUrl