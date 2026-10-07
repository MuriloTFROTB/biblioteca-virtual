import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col ">
            <main className="">
                <form action="" className="flex " >
                    <input type="text" name="email" id="email" placeholder="Digite o email aqui"/>
                    <input type="text" name="password" id="password" placeholder="Digite o senha aqui"/>

                    <button type="submit">Login</button>

                </form>
            </main>
        </div>
    );
}
