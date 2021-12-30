import type { NextPage } from 'next'
import Head from 'next/head'
import Menu from '../components/menu'
import styles from '../styles/Home.module.css'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import ShortenUrlObj from './shortenurl'
import { useRouter } from 'next/router';

interface ShortenUrlObj {
    id: string,
    fromUrl: string,
    toUrl: string,
    toId: string,
    lastModifiedAt: Date,
    clickCount: number
}

// Props interface
// with username set to string
interface Props {
    data: ShortenUrlObj[];
}
const apiUrl = "http://localhost:3000";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const urladminApi = async (): Promise<ShortenUrlObj[]> => {
        try {
            const response: AxiosResponse = await axios.get(`${apiUrl}/urladmin`);
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
        }
        return [];
    }

    let data = await urladminApi();
    return {
        props: {
            data
        }
    }
}

const UrlAdmin: NextPage<Props> = (props) => {
    let records = props.data;
    const router = useRouter();
    const [data, setData] = useState(records);

    const refreshData = () => {
        router.replace(router.asPath);
      }


    const deleteUrlApi = async (id: string): Promise<boolean> => {
        try {
            const response: AxiosResponse = await axios.delete(`${apiUrl}/urladmin?id=${id}`);
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
        }
        return false;
    }

    const handleClick = async (id: string, rowIndex: number) => {
        let result = await deleteUrlApi(id);
        if(result){
            let temp = data;
            temp.splice(rowIndex, 1);
            setData(temp);
            refreshData();
        }
    };

    return (<>
        <Head>
            <title>Url Admin</title>
            <meta name="description" content="Shorten Url" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Menu></Menu>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Url Admin
            </h1>
            <Row>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>From Url</th>
                            <th>To Url</th>
                            <th>To Id</th>
                            <th>Click Count</th>
                            <th>Last Modified At</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value: ShortenUrlObj, index) => {
                                return (<tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.fromUrl}</td>
                                    <td><a>{value.toUrl}</a></td>
                                    <td>{value.toId}</td>
                                    <td>{value.clickCount}</td>
                                    <td>{value.lastModifiedAt}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleClick(value.id, index)} >Delete</Button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Row>
        </main>
    </>)
}
export default UrlAdmin