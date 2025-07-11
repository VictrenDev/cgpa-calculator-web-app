import ScrollEffect from "@/components/intersectionObserver"
import Link from "next/link"
// import Image from "next/image"

export default function Home() {
    return (
        <>
            <nav className=" mb-8 border-b border-b-gray-300 py-4">
                <div className="container-fluid flex justify-between items-center">
                    <Link className="inline-block" href="/">logo</Link>
                    <ul className="flex flex-wrap gap-2 navigation-item-list">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">Features</Link></li>
                        <li><Link href="/">How to Use</Link></li>
                        <li><Link href="/">Contact</Link></li>
                    </ul>
                    <Link className="inline-block" href="/signup" target="_blank">Get Started</Link>

                </div>
            </nav>
            <header className="container-fluid py-8">
                <ScrollEffect as="h1" className="lg:w-160 text-4xl md:text-6xl font-bold text-gray-900 leading-[1.2]">Welcome to Your Student Dashboard – Track Your Academic Journey Effortlessly</ScrollEffect>
                <ScrollEffect as="p" delay={100} className="mt-4">Stay updated with your grades, progress, and academic goals all in one place.</ScrollEffect>
                <ScrollEffect as="div" delay={200} className="mt-12 h-80 md:h-160 w-full bg-gray-300"></ScrollEffect>
            </header>
            {/* FEATURES */}
            <section className="container-fluid py-20 md:py-40">
                <ScrollEffect as="p" className="text-sm mb-4">Features</ScrollEffect>
                <ScrollEffect as="h2" delay={100} className="text-3xl md:text-5xl max-w-200 md:leading-14 mb-4 font-bold">Explore the Key Features of Our Application</ScrollEffect>
                <ScrollEffect as="p" delay={200} className="lg:w-150 pb-6">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</ScrollEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                    <ScrollEffect as="div" className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Real-Time Academic Performance Tracking</p>
                        <p className="mt-4">Stay updated with your current GPA and CGPA.</p>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Visual Grade Distribution Insights</p>
                        <p className="mt-4">Visual Grade Distribution Insights</p>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={400} className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </ScrollEffect>
                </div>
            </section>

            <section className="container-fluid py-20 md:py-40 grid md:grid-cols-[380px_1fr] gap-12 lg:items-center">
                <ScrollEffect as="div" className="space-y-6">
                    <p className="text-sm">Track</p>
                    <h2 className="text-4xl md:text-5xl font-bold ,md:leading-14">Easily Monitor Your Academic Progress</h2>
                    <p className="">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</p>
                </ScrollEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    <ScrollEffect as="div" delay={100} className="">
                        <p className=""><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.39567 36.2034C4.91234 36.2034 4.50917 36.0396 4.18617 35.7119C3.86284 35.3846 3.70117 34.9806 3.70117 34.4999V13.4999C3.70117 13.0192 3.86567 12.6152 4.19467 12.2879C4.52367 11.9602 4.92984 11.7964 5.41317 11.7964C5.89651 11.7964 6.29984 11.9602 6.62317 12.2879C6.94617 12.6152 7.10767 13.0192 7.10767 13.4999V34.4999C7.10767 34.9806 6.94317 35.3846 6.61417 35.7119C6.28517 36.0396 5.87901 36.2034 5.39567 36.2034ZM37.7717 25.7034H13.7612C13.2802 25.7034 12.876 25.5387 12.5487 25.2094C12.2213 24.8804 12.0577 24.4742 12.0577 23.9909C12.0577 23.5079 12.2213 23.1047 12.5487 22.7814C12.876 22.4581 13.2802 22.2964 13.7612 22.2964H37.7717L30.7807 15.2434C30.4327 14.9034 30.2607 14.5056 30.2647 14.0499C30.2687 13.5942 30.4407 13.1964 30.7807 12.8564C31.1203 12.5164 31.5162 12.3464 31.9682 12.3464C32.4198 12.3464 32.8197 12.5164 33.1677 12.8564L43.1057 22.7944C43.2883 22.9771 43.421 23.1699 43.5037 23.3729C43.586 23.5759 43.6272 23.7871 43.6272 24.0064C43.6272 24.2261 43.586 24.4351 43.5037 24.6334C43.421 24.8321 43.2883 25.0227 43.1057 25.2054L33.1677 35.1434C32.8197 35.4834 32.4172 35.6552 31.9602 35.6589C31.5032 35.6629 31.1073 35.5016 30.7727 35.1749C30.43 34.8219 30.2587 34.4077 30.2587 33.9324C30.2587 33.4571 30.4287 33.0484 30.7687 32.7064L37.7717 25.7034Z" fill="black" />
                        </svg>
                        </p>
                        <p className="mt-6 font-semibold text-2xl">Real-Time Academic Performance Tracking</p>
                        <p className="mt-4">Stay updated with your current GPA and CGPA.</p>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="">
                        <p className=""><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.2964 23.0389V42.6334C22.2964 43.1308 22.4581 43.5409 22.7814 43.8639C23.1048 44.1873 23.5109 44.3489 23.9999 44.3489C24.4889 44.3489 24.8951 44.1873 25.2184 43.8639C25.5418 43.5409 25.7034 43.1308 25.7034 42.6334V23.0389L30.0064 27.2924C30.3464 27.6068 30.7443 27.7683 31.1999 27.7769C31.6556 27.7856 32.0534 27.6241 32.3934 27.2924C32.7411 26.9524 32.9149 26.5546 32.9149 26.0989C32.9149 25.6429 32.7411 25.2411 32.3934 24.8934L25.2054 17.7054C24.8654 17.3654 24.4636 17.1954 23.9999 17.1954C23.5363 17.1954 23.1344 17.3654 22.7944 17.7054L15.5944 24.9054C15.2548 25.2451 15.0869 25.6429 15.0909 26.0989C15.0946 26.5546 15.2664 26.9524 15.6064 27.2924C15.9464 27.6401 16.3443 27.8139 16.7999 27.8139C17.2556 27.8139 17.6534 27.6401 17.9934 27.2924L22.2964 23.0389ZM23.9999 7.26295C19.3463 7.26295 15.3954 8.88911 12.1474 12.1414C8.89911 15.3934 7.27495 19.3463 7.27495 23.9999C7.27495 25.2296 7.40061 26.4363 7.65195 27.6199C7.90361 28.8036 8.30145 29.9389 8.84545 31.0259C9.04545 31.5056 9.11245 31.9961 9.04645 32.4974C8.98078 32.9984 8.74928 33.4029 8.35195 33.7109C7.98828 33.9936 7.59095 34.1103 7.15995 34.0609C6.72861 34.0116 6.41295 33.7836 6.21295 33.3769C5.42761 31.9249 4.83845 30.4101 4.44545 28.8324C4.05278 27.2551 3.85645 25.6443 3.85645 23.9999C3.85645 21.2173 4.38545 18.5993 5.44345 16.1459C6.50145 13.6929 7.93645 11.5604 9.74845 9.74844C11.5604 7.93644 13.6929 6.50144 16.1459 5.44344C18.5993 4.38544 21.2173 3.85645 23.9999 3.85645C26.7826 3.85645 29.4006 4.38544 31.8539 5.44344C34.3069 6.50144 36.4394 7.93644 38.2514 9.74844C40.0634 11.5604 41.4984 13.6929 42.5564 16.1459C43.6144 18.5993 44.1434 21.2173 44.1434 23.9999C44.1434 25.6363 43.9491 27.2391 43.5604 28.8084C43.1714 30.3781 42.5883 31.8851 41.8109 33.3294C41.6029 33.7358 41.2853 33.9696 40.8579 34.0309C40.4309 34.0923 40.0316 33.9856 39.6599 33.7109C39.2466 33.4029 39.0091 32.9984 38.9474 32.4974C38.8854 31.9961 38.9584 31.5016 39.1664 31.0139C39.6691 29.9349 40.0566 28.8056 40.3289 27.6259C40.6009 26.4463 40.7369 25.2376 40.7369 23.9999C40.7369 19.3463 39.1108 15.3934 35.8584 12.1414C32.6064 8.88911 28.6536 7.26295 23.9999 7.26295Z" fill="black" />
                        </svg>
                        </p>
                        <p className="mt-6 font-semibold text-2xl">Visual Grade Distribution Insights On App</p>
                        <p className="mt-4">Stay updated with your current GPA and CGPA.</p>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={300} className="">
                        <p className=""><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.78516 34.8684V13.1194C5.78516 12.1827 6.11866 11.3807 6.78566 10.7134C7.45299 10.0464 8.25899 9.71289 9.20366 9.71289H38.8087C39.7457 9.71289 40.5477 10.0464 41.2147 10.7134C41.8817 11.3807 42.2152 12.1827 42.2152 13.1194V34.8684C42.2152 35.8127 41.8817 36.6186 41.2147 37.2859C40.5477 37.9532 39.7457 38.2869 38.8087 38.2869H9.20366C8.25899 38.2869 7.45299 37.9532 6.78566 37.2859C6.11866 36.6186 5.78516 35.8127 5.78516 34.8684ZM9.20366 18.3979H14.4197V13.1194H9.20366V18.3979ZM17.4197 18.3979H38.8087V13.1194H17.4197V18.3979ZM17.4197 26.6019H38.8087V21.3979H17.4197V26.6019ZM17.4197 34.8684H38.8087V29.6019H17.4197V34.8684ZM9.20366 34.8684H14.4197V29.6019H9.20366V34.8684ZM9.20366 26.6019H14.4197V21.3979H9.20366V26.6019Z" fill="black" />
                        </svg>
                        </p>
                        <p className="mt-6 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={400} className="">
                        <p className=""><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0002 44.299C21.1508 44.299 18.492 43.776 16.0237 42.73C13.5557 41.684 11.4078 40.2473 9.58017 38.42C7.75284 36.5923 6.31617 34.4445 5.27017 31.9765C4.22417 29.5081 3.70117 26.8493 3.70117 24C3.70117 21.151 4.22417 18.493 5.27017 16.026C6.31584 13.5586 7.75184 11.4101 9.57817 9.58046C11.4045 7.7508 13.5522 6.31146 16.0212 5.26246C18.4902 4.21346 21.1498 3.68896 24.0002 3.68896C24.4558 3.68896 24.8537 3.8613 25.1937 4.20596C25.5337 4.5503 25.7037 4.95013 25.7037 5.40546C25.7037 5.86046 25.5337 6.25796 25.1937 6.59796C24.8537 6.93763 24.4558 7.10746 24.0002 7.10746C19.3238 7.10746 15.3393 8.7538 12.0467 12.0465C8.75401 15.3391 7.10767 19.3236 7.10767 24C7.10767 28.676 8.75401 32.6605 12.0467 35.9535C15.3393 39.2461 19.3238 40.8925 24.0002 40.8925C28.6762 40.8925 32.6607 39.2461 35.9537 35.9535C39.2463 32.6608 40.8927 28.6763 40.8927 24C40.8927 23.5443 41.0625 23.1465 41.4022 22.8065C41.7422 22.4665 42.1397 22.2965 42.5947 22.2965C43.05 22.2965 43.4498 22.4665 43.7942 22.8065C44.1388 23.1465 44.3112 23.5443 44.3112 24C44.3112 26.8503 43.7865 29.51 42.7372 31.979C41.6875 34.4483 40.2488 36.5963 38.4212 38.423C36.5935 40.2496 34.4455 41.6856 31.9772 42.731C29.5092 43.7763 26.8502 44.299 24.0002 44.299Z" fill="black" />
                        </svg>
                        </p>
                        <p className="mt-6 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </ScrollEffect>
                </div>
            </section>

            <section className="container-fluid py-20 md:py-40">
                <ScrollEffect as="h2" className="text-2xl md:text-5xl lg:w-200 mb-4 font-bold">Comprehensive Academic Insights at Your Fingertips</ScrollEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-4 lg:justify-center gap-12 pt-10 md:pt-20">
                    <ScrollEffect as="div" className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 gap-4">
                        <p><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0002 44.299C21.1508 44.299 18.492 43.776 16.0237 42.73C13.5557 41.684 11.4078 40.2473 9.58017 38.42C7.75284 36.5923 6.31617 34.4445 5.27017 31.9765C4.22417 29.5081 3.70117 26.8493 3.70117 24C3.70117 21.151 4.22417 18.493 5.27017 16.026C6.31584 13.5586 7.75184 11.4101 9.57817 9.58046C11.4045 7.7508 13.5522 6.31146 16.0212 5.26246C18.4902 4.21346 21.1498 3.68896 24.0002 3.68896C24.4558 3.68896 24.8537 3.8613 25.1937 4.20596C25.5337 4.5503 25.7037 4.95013 25.7037 5.40546C25.7037 5.86046 25.5337 6.25796 25.1937 6.59796C24.8537 6.93763 24.4558 7.10746 24.0002 7.10746C19.3238 7.10746 15.3393 8.7538 12.0467 12.0465C8.75401 15.3391 7.10767 19.3236 7.10767 24C7.10767 28.676 8.75401 32.6605 12.0467 35.9535C15.3393 39.2461 19.3238 40.8925 24.0002 40.8925C28.6762 40.8925 32.6607 39.2461 35.9537 35.9535C39.2463 32.6608 40.8927 28.6763 40.8927 24C40.8927 23.5443 41.0625 23.1465 41.4022 22.8065C41.7422 22.4665 42.1397 22.2965 42.5947 22.2965C43.05 22.2965 43.4498 22.4665 43.7942 22.8065C44.1388 23.1465 44.3112 23.5443 44.3112 24C44.3112 26.8503 43.7865 29.51 42.7372 31.979C41.6875 34.4483 40.2488 36.5963 38.4212 38.423C36.5935 40.2496 34.4455 41.6856 31.9772 42.731C29.5092 43.7763 26.8502 44.299 24.0002 44.299Z" fill="black" />
                        </svg>
                        </p>
                        <p className=" font-semibold text-xl">Track Your Progress and Achieve Your Academic Goals</p>
                        <p className=" ">Our CGPA Calculator provides real-time updates on your academic performance.</p>
                        <Link href="/" className="">Explore</Link>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 gap-4">
                        <p><svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9242 42.7445C13.5758 42.3958 13.4017 41.9956 13.4017 41.544C13.4017 41.0923 13.5755 40.6925 13.9232 40.3445L24.0797 30.2C24.734 29.5203 25.538 29.1868 26.4917 29.1995C27.4453 29.2121 28.2493 29.5456 28.9037 30.2L33.4667 34.763L43.0732 25.2065C43.4158 24.8665 43.8143 24.6985 44.2687 24.7025C44.723 24.7065 45.1202 24.8758 45.4602 25.2105C45.8002 25.5451 45.9702 25.9428 45.9702 26.4035C45.9702 26.8645 45.8002 27.2651 45.4602 27.6055L35.8537 37.2C35.1977 37.8543 34.3997 38.1815 33.4597 38.1815C32.5193 38.1815 31.722 37.8543 31.0677 37.2L26.4667 32.599L16.3102 42.7555C15.9622 43.0951 15.5623 43.263 15.1107 43.259C14.659 43.2553 14.2635 43.0838 13.9242 42.7445ZM7.77418 42.299C6.85484 42.299 6.05718 41.9611 5.38118 41.2855C4.70551 40.6101 4.36768 39.8125 4.36768 38.8925V8.10746C4.36768 7.18413 4.70551 6.38363 5.38118 5.70596C6.05651 5.02796 6.85418 4.68896 7.77418 4.68896H37.5592C38.4825 4.68896 39.283 5.02796 39.9607 5.70596C40.6387 6.38363 40.9777 7.18413 40.9777 8.10746V17.8685C40.9777 18.3491 40.8117 18.7531 40.4797 19.0805C40.148 19.4078 39.7422 19.5715 39.2622 19.5715H7.77418V42.299ZM7.77418 16.249H37.5592V8.10746H7.77418V16.249Z" fill="black" />
                        </svg>
                        </p>
                        <p className="font-semibold text-xl ">Visualise Your Academic Journey with Interactive Charts</p>
                        <p className=" ">Engage with dynamic charts that illustrate your grade distribution and progress.</p>
                        <Link href="/" className="">Explore</Link>
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={400} className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 gap-4">
                        <p><svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.03459 18.5V9.10746C4.03459 8.18413 4.37243 7.38363 5.04809 6.70596C5.72343 6.02796 6.52109 5.68896 7.44109 5.68896H41.2261C42.1494 5.68896 42.9499 6.02796 43.6276 6.70596C44.3056 7.38363 44.6446 8.18413 44.6446 9.10746V18.5H41.2261V9.10746H7.44109V18.5H4.03459ZM7.44109 36.299C6.52109 36.299 5.72343 35.9611 5.04809 35.2855C4.37243 34.6101 4.03459 33.8125 4.03459 32.8925V21.5H7.44109V32.8925H41.2261V21.5H44.6446V32.8925C44.6446 33.8125 44.3056 34.6101 43.6276 35.2855C42.9499 35.9611 42.1494 36.299 41.2261 36.299H7.44109ZM3.61859 42.4425C3.17659 42.4425 2.80609 42.2911 2.50709 41.9885C2.20809 41.6858 2.05859 41.3106 2.05859 40.863C2.05859 40.419 2.20926 40.0473 2.51059 39.748C2.81159 39.4486 3.18476 39.299 3.63009 39.299H45.0486C45.4906 39.299 45.8611 39.4516 46.1601 39.757C46.4591 40.062 46.6086 40.4366 46.6086 40.881C46.6086 41.325 46.4579 41.6961 46.1566 41.9945C45.8556 42.2931 45.4824 42.4425 45.0371 42.4425H3.61859ZM4.03459 21.5V18.5H16.3381C16.6071 18.5 16.8653 18.5666 17.1126 18.7C17.3599 18.8333 17.5503 19.0333 17.6836 19.3L20.4371 24.912L26.9716 13.362C27.0969 13.0953 27.2866 12.9036 27.5406 12.787C27.7946 12.6703 28.0589 12.612 28.3336 12.612C28.6083 12.612 28.8686 12.6693 29.1146 12.784C29.3606 12.8986 29.5503 13.0873 29.6836 13.35L32.2111 18.5H44.6446V21.5H31.4151C31.0958 21.5 30.7963 21.4213 30.5166 21.264C30.2369 21.107 30.0266 20.8791 29.8856 20.5805L28.2336 17.262L21.6956 28.676C21.5716 28.9506 21.3854 29.1566 21.1371 29.294C20.8888 29.4313 20.6281 29.5 20.3551 29.5C20.0741 29.5 19.8086 29.4333 19.5586 29.3C19.3086 29.1666 19.1169 28.9666 18.9836 28.7L15.3836 21.5H4.03459Z" fill="black" />
                        </svg>
                        </p>
                        <p className=" font-semibold text-xl ">Stay Updated with Recent Course Activities</p>
                        <p className=" ">Easily access your recently added courses and monitor your academic journey.</p>
                        <Link href="/" className="">Explore</Link>
                    </ScrollEffect>
                </div>
            </section>

            <section className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-12 group py-20 items-center ">
                <div>
                    <ScrollEffect as="p" className="text-sm pb-6">Empower</ScrollEffect>
                    <ScrollEffect as="h2" delay={100} className="text-2xl md:text-5xl pb-6 font-bold md:leading-14">Your Academic Success Starts Here</ScrollEffect>
                    <ScrollEffect as="p" delay={200} className=" pb-6">Our mission is to provide students with a seamless tool for tracking their academic performance. We envision a future where every student has the insights they need to excel.</ScrollEffect>
                    <ScrollEffect as="div" delay={300} className="space-x-2">
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>

                    </ScrollEffect>
                </div>

                <ScrollEffect as="div" className="bg-gray-300 h-120 relative rounded-md custom-frame ">
                    <div className="w-full h-full z-50 bg-red-600 rounded-md overflow-hidden">

                    </div>
                    {/* <Image src="/search.png" width={600} height={600} alt="Feature Image" className="w-full h-auto z-50" /> */}
                </ScrollEffect>
            </section >
            <section className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-12 py-20 items-center">
                <div>
                    <ScrollEffect as="h2" className="text-2xl md:text-5xl pb-6 font-bold md:leading-14">Join Our CGPA Calculator Today</ScrollEffect>
                    <ScrollEffect as="p" delay={100} className=" pb-6">Track your academic performance effortlessly and achieve your goals with our intuitive tool.</ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="space-x-2">
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>

                    </ScrollEffect>
                </div>

                <ScrollEffect as="div" className="bg-gray-300 h-80">

                </ScrollEffect>
            </section>


        </>
    )
}
