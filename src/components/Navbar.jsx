import { SignIn, SignInButton, UserButton } from '@clerk/clerk-react';
import React from 'react'
import { useUser } from '@clerk/clerk-react';



const Navbar = () => {
const [showButtons, setShowButtons] = React.useState(false);

const handleHomeClick = () => {
    window.location.href = '/';
};

const { isSignedIn } = useUser();

return (
    <>
        <div className=''>
            <img src="" alt="" />
            <nav style={{ position: 'relative' }} className='flex justify-between items-center p-4 text-xl font-bold'>
                <ul className="flex gap-8">
                    {[
                        { label: 'Home', onClick: handleHomeClick },
                        { label: 'Conditions', href: '/about', buttons: [
                            { label: 'About Btn 1', href: '/about/btn1' },
                            { label: 'About Btn 2', href: '/about/btn2' }
                        ] },
                        { label: 'Drugs and Supplements', href: '/services', buttons: [
                            { label: 'Service Btn 1', href: '/services/btn1' },
                            { label: 'Service Btn 2', href: '/services/btn2' }
                        ] },
                        { label: 'Symptom checker', href: '/Symptomchecker',},
                        { label: 'Find a Doctor', href: '/Doctor'  },

                        { label: 'Emergency', href: '/Hospital.jsx', buttons: [
                            { label: 'Nearby Hospitals', href: '/Emergency/Hospital' },
                            { label: 'Ambulance ph', href: '/Emergency/Ambulance' },
                            { label: 'SOS', href: '/Emergency/Sos' }
                        ] },
                    ].map((item, idx) => (
                        <li
                            key={item.label}
                            onMouseEnter={() => item.buttons && setShowButtons(item.label)}
                            onMouseLeave={() => item.buttons && setShowButtons(item.label)}
                            style={{ position: 'relative' }}
                        >
                            {item.onClick ? (
                                <a onClick={item.onClick} style={{ cursor: 'pointer' }}>{item.label}</a>
                            ) : (
                                <a
                                    href={item.href}
                                    style={{
                                        color: showButtons === item.label ? '#8A1C7C' : undefined,
                                        transition: 'color 0.2s'
                                    }}
                                    onClick={e => {
                                        if (item.href === '/contact') e.preventDefault();
                                    }}
                                >
                                    {item.label}
                                </a>
                            )}
                            {item.buttons && showButtons === item.label && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '8px',
                                    backgroundColor: '#8A1C7C',
                                    padding: '8px',
                                    borderRadius: '4px'
                                }}>
                                    {item.buttons.map(btn => (
                                        <a
                                            key={btn.label}
                                            href={btn.href}
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                                padding: '4px 8px',
                                                borderRadius: '2px',
                                                background: 'rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {btn.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <div>
                    {isSignedIn ? (
                        <UserButton/>
                    ) : (
                        <SignInButton/>
                    )}
                </div>
            </nav>
        </div>
    </>
)
}

export default Navbar