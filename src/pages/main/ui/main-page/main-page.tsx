import iconApple from '@/shared/assests/apple.png'
import imageCat from '@/shared/assests/cat.jpeg'

export const MainPage = () => {
    return (
        <div>
            MainPage
            <div>
                <img src={imageCat} width={300} alt='Cat' />
                <img src={iconApple} width={50} alt='Apple' />
            </div>
        </div>
    )
}
