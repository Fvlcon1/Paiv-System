'use client'

import { useState } from 'react'
import { FiEdit2, FiSave, FiMapPin, FiPhone, FiMail, FiGlobe, FiClock, FiInfo } from 'react-icons/fi'
import Text from '@styles/components/text'
import theme from '@styles/theme'
import { TypographyBold } from '@styles/style.types'
import Input from '@components/input/input'
import Button from '@components/button/button'
import { FaHospital } from 'react-icons/fa'

const FacilityProfile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [facility, setFacility] = useState({
        name: 'St. Mary\'s Medical Center',
        type: 'Tertiary Hospital',
        registrationNumber: 'HSP-2023-0456',
        licenseNumber: 'HCF-7890-GH',
        address: '123 Healthcare Avenue, Accra',
        phone: '+233 24 123 4567',
        email: 'info@stmarysmedical.gh',
        website: 'www.stmarysmedical.gh',
        workingHours: '24/7',
        description: 'A leading healthcare provider in the Greater Accra Region, offering comprehensive medical services with state-of-the-art facilities and experienced medical professionals.'
    })

    const handleInputChange = (field: string, value: string) => {
        setFacility(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Text>
                Under Construction
            </Text>
        </div>
    )
}

export default FacilityProfile