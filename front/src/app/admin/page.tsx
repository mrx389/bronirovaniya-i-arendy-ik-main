'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'
import Layout from "@/components/layout/Layout";
import Star from "@/components/theBooksSold/icons/star";

interface Direction {
    id: string;
    address: string;
    price: string;
    image: string;
    description: string;
    day: string;
}


const PageAdmin = () => {
    const [rent, setRent] = useState<Direction[]>([]);
    const [newRent, setNewRent] = useState<Direction>({
        id: '',
        address: '',
        price: '',
        image: '',
        description: "",
        day: '',
    });
    const [review, setReview] = useState<Direction[]>([]);
    const [newReview, setNewReview] = useState<any>({
        id: '',
        name: '',
        review: '',
        avatar: '',
    });
    const [rentItem, setRentItem] = useState<any>([]);
    const [newRentItem, setNewRentItem] = useState<any>({
        id: '',
        title: "",
        price: "",
        description: "",
        day: '',
        RentId: '',
        image: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/rent');
            const responseRev = await fetch('http://localhost:5000/api/review/');
            const responseRevItem = await fetch('http://localhost:5000/api/rental_item');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            const jsonDataRev = await responseRev.json();
            const jsonDataRevItem = await responseRevItem.json();
            setRent(jsonData);
            setReview(jsonDataRev);
            setRentItem(jsonDataRevItem);
        };

        fetchData();
    }, []);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setNewRent(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewRent(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleChangeRentItem = (e: any) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setNewRentItem((prevState: any) => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewRentItem((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleChangeReview = (e: any) => {
        const { name, value } = e.target;
        if (name === 'avatar') {
            setNewReview((prevState: any) => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewReview((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/rent/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setRent((book: any) => book.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleDeleteReview = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/review/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setReview((book: any) => book.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleDeleteReviewItem = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/rental_item/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setRentItem((book: any) => book.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', newRent.id);
            formData.append('address', newRent.address);
            formData.append('price', newRent.price);
            formData.append('image', newRent.image);
            formData.append('description', newRent.description);
            formData.append('day', newRent.day);

            const response = await fetch('http://localhost:5000/api/rent/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/rent');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setReview(jsonData);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', newRent.id);
            formData.append('name', newReview.name);
            formData.append('review', newReview.review);
            formData.append('avatar', newReview.avatar);

            const response = await fetch('http://localhost:5000/api/review/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/review');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setReview(jsonData);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleSubmitRentItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', newRentItem.id);
            formData.append('title', newRentItem.title);
            formData.append('address', newRentItem.address);
            formData.append('price', newRentItem.price);
            formData.append('image', newRentItem.image);
            formData.append('description', newRentItem.description);
            formData.append('day', newRentItem.day);
            formData.append('RentId', newRentItem.RentId);

            const response = await fetch('http://localhost:5000/api/rental_item/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/review');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setReview(jsonData);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <Layout Header='home' isFooterHidden>
            <div className={styles.wrapperAdmin}>
                <div className={styles.addBooks}>
                    <div>
                        <h2 className={styles.nameAdmin}>Добавить новую тур</h2>
                        <form className={styles.formAdmin} onSubmit={handleSubmit}>
                            <div className={styles.inputForm}>
                                <label>Название:</label>
                                <input className={styles.input} placeholder='Название' type="text" name="address"
                                       value={newRent.address} onChange={handleChange}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Цена:</label>
                                <input className={styles.input} placeholder='Цена' type="number" name="price"
                                       value={newRent.price} onChange={handleChange}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Текст:</label>
                                <input className={styles.input} placeholder='Текст' type="text" name="description"
                                       value={newRent.description} onChange={handleChange}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Дней:</label>
                                <input className={styles.input} placeholder='Дней' type="text" name="day"
                                       value={newRent.day} onChange={handleChange}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Картинка:</label>
                                <div className={styles.blockImages}>
                                    <input className={styles.imagesInput} type="file" name="image"
                                           accept='/image/*, .png, .jpg, .web'
                                           onChange={handleChange}/>
                                </div>
                            </div>

                            <button className={styles.summit} type="submit">Отправить</button>
                        </form>
                    </div>

                    <div>
                        <h2 className={styles.nameAdmin}>Добавить домики</h2>
                        <form className={styles.formAdmin} onSubmit={handleSubmitRentItem}>
                            <div className={styles.inputForm}>
                                <label>Название:</label>
                                <input className={styles.input} placeholder='Название' type="text" name="title"
                                       value={newRentItem.title} onChange={handleChangeRentItem}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Адрес:</label>
                                <input className={styles.input} placeholder='Адрес' type="text" name="address"
                                       value={newRentItem.address} onChange={handleChangeRentItem}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Картинка:</label>
                                <div className={styles.blockImages}>
                                    <input className={styles.imagesInput} type="file" name="image"
                                           accept='/image/*, .png, .jpg, .web'
                                           onChange={handleChangeRentItem}/>
                                </div>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Текст:</label>
                                <input className={styles.input} placeholder='Текст' type="text" name="description"
                                       value={newRentItem.description} onChange={handleChangeRentItem}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Цена:</label>
                                <input className={styles.input} placeholder='Цена' type="number" name="price"
                                       value={newRentItem.price} onChange={handleChangeRentItem}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Дней:</label>
                                <input className={styles.input} placeholder='Дней' type="text" name="day"
                                       value={newRentItem.day} onChange={handleChangeRentItem}/>
                            </div>
                            <select name="RentId" value={newRentItem.RentId} onChange={handleChangeRentItem}>
                                <option>Название туров</option>
                                {rent.map(direction => (
                                    <option key={direction.id} value={direction.id}>
                                        {direction.address}
                                    </option>
                                ))}
                            </select>
                            <button className={styles.summit} type="submit">Отправить</button>
                        </form>
                    </div>

                    <div>
                        <h2 className={styles.nameAdmin}>Добавить новые комментарии</h2>
                        <form className={styles.formAdmin} onSubmit={handleSubmitReview}>
                            <div className={styles.inputForm}>
                                <label>Имя:</label>
                                <input className={styles.input} placeholder='Имя' type="text" name="name"
                                       value={newReview.name} onChange={handleChangeReview}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Комментарий:</label>
                                <input className={styles.input} placeholder='Коментарий' type="text" name="review"
                                       value={newReview.review} onChange={handleChangeReview}/>
                            </div>
                            <div className={styles.inputForm}>
                                <label>Картинка:</label>
                                <div className={styles.blockImages}>
                                    <input className={styles.imagesInput} type="file" name="avatar"
                                           accept='/image/*, .png, .jpg, .web'
                                           onChange={handleChangeReview}/>
                                </div>
                            </div>
                            <button className={styles.summit} type="submit">Отправить</button>
                        </form>
                    </div>
                </div>

                <div className={styles.block}>
                    <h2 className={styles.nameBooksList}>Добавленные Туры</h2>
                    <ul className={styles.blockList}>
                        {rent.map((elem) => (
                            <li key={elem.id} className={styles.infoList}>
                                <div>
                                    <img src={`http://localhost:5000/${elem.image}`} alt='tower'
                                         className={styles.imgesBooks}/>
                                    <div className={styles.textBooks}>
                                        <div className={styles.renovationBook}>{elem.address}</div>
                                        <div className={styles.infoDay}>
                                        <div className={styles.prise}>{elem.price} сом</div>
                                        <div className={styles.day}>{elem.day} дней</div>
                                        </div>
                                    </div>
                                    <p className={styles.renovationBook}>{elem.description}</p>
                                </div>
                                <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.block}>
                    <h2 className={styles.nameBooksList}>Добавленные комментарии</h2>
                    <ul className={styles.blockList}>
                        {review.map((elem: any) => (
                            <div key={elem.id} className={styles.blockComment}>
                                <div className={styles.userComments}>
                                    <div className={styles.userBlock}>
                                        <div className={styles.infoUser}>
                                            <div className={styles.userImg}>
                                                <img src={`http://localhost:5000/${elem.avatar}`} alt='tower'
                                                     className={styles.userImg}/>
                                            </div>
                                            <h2 className={styles.name}>{elem.name}</h2>
                                            <div><Star/></div>
                                            <p className={styles.textDesc}>{elem.review}</p>
                                        </div>
                                    </div>
                                    <button className={styles.delete} onClick={() => handleDeleteReview(elem.id)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className={styles.block}>
                    <h2 className={styles.nameBooksList}>Добавленные домики</h2>
                    <ul className={styles.blockList}>
                        {rentItem.map((elem: any) => (
                            <div key={elem.id} className={styles.blockComment}>
                                <div className={styles.userComments}>
                                    <div className={styles.userBlock}>
                                        <div className={styles.infoUser}>
                                            <div className={styles.userImg}>
                                                <img src={`http://localhost:5000/${elem.image}`} alt='img'
                                                     className={styles.userImg}/>
                                            </div>
                                            <h2 className={styles.name}>{elem.title}</h2>
                                            <h2 className={styles.name}>{elem.price}</h2>
                                            <h2 className={styles.name}>{elem.day}</h2>
                                            <h2 className={styles.name}>{elem.description}</h2>
                                            <div><Star/></div>
                                            <p className={styles.textDesc}>{elem.review}</p>
                                        </div>
                                    </div>
                                    <button className={styles.delete} onClick={() => handleDeleteReviewItem(elem.id)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default PageAdmin;
