'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { MdCheckCircle, MdEmail, MdErrorOutline, MdMyLocation } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"
import { RiLockPasswordFill } from "react-icons/ri"
import { GiHospitalCross } from "react-icons/gi"
import { IoLocation, IoMap } from "react-icons/io5"
import Pressable from "@components/button/pressable"
import { DropdownItem } from "@/utils/@types"
import { FaEye, FaEyeSlash, FaPowerOff } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import Dropdown from "@components/dropdown/dropdown"
import Coordinates from "./coordinates"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { motion } from 'framer-motion';
import useGeoLocation from "../../hooks/useGeoLocation"
import { Tooltip } from "antd"
import { FaLocationDot } from "react-icons/fa6"
import useRegion from "../hooks/useRegion"
import { BiChevronDown } from "react-icons/bi"

// Password requirement type
type PasswordRequirement = {
    text: string
    validator: (value: string) => boolean
}

const Form = ({
    loading,
    formik,
}: {
    formik: any,
    loading: boolean
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [showCoordinatesInput, setShowCoordinatesInput] = useState(false)
    const [longitude, setLongitude] = useState<string>('')
    const [latitude, setLatitude] = useState<string>('')
    const [coordinates, setCoordinates] = useState('')
    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([])
    const controllerRef = useRef<AbortController>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showRequirements, setShowRequirements] = useState(false)
    const { getLocation } = useGeoLocation()
    const { regionDropdown, districtDropdown, searchRegion, searchDistrict, setSearchRegion, setSearchDistrict } = useRegion(formik)

    const setCoodinatesInput = (value: string) => {
        console.log({ value })
        formik.setFieldValue("location", value)
    }

    const transformLocationSearch = (searchData: any[]): DropdownItem[] => {
        const transformedData: DropdownItem[] = []
        searchData.map((place, index) => {
            const entry = {
                key: place.osm_id, label: place.display_name, onClick: () => {
                    formik.setFieldValue("location", place.display_name)
                    formik.setFieldValue("longitude", place.lat)
                    formik.setFieldValue("latitude", place.lon)
                    formik.setFieldValue("manual", false)
                    setShowSuggestions(false)
                }
            }
            transformedData.push(entry)
            if (index !== searchData.length - 1) {
                transformedData.push({ type: "divider", key: `divider-${place.osm_id}` })
            }
        })
        if (transformedData.length) {
            return [
                { key: "1", label: "Results", type: 'title', disabled: true },
                ...transformedData
            ]
        } else {
            return [
                { key: "1", label: "No Results", type: 'title', disabled: true },
            ]
        }
    }

    const searchLocations = async () => {
        // Cancel the previous request if it exists
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    format: "json",
                    q: formik.values.location,
                    countrycodes: "gh",
                },
                signal: controllerRef.current.signal,
            });

            return response.data;
        } catch (error: any) {
            if (axios.isCancel(error)) {
                return
            } else {
                throw new Error(error)
            }
        }
    };

    // Password requirements configuration
    const passwordRequirements: PasswordRequirement[] = [
        {
            text: "At least 8 characters",
            validator: (value) => value.length >= 8
        },
        {
            text: "Contains at least one number",
            validator: (value) => /\d/.test(value)
        },
        {
            text: "Contains at least one special character",
            validator: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
        },
        {
            text: "Contains at least one uppercase letter",
            validator: (value) => /[A-Z]/.test(value)
        },
        {
            text: "Contains at least one lowercase letter",
            validator: (value) => /[a-z]/.test(value)
        }
    ]

    // Check which requirements are met
    const checkRequirements = (password: string) => {
        return passwordRequirements.map(req => ({
            ...req,
            isValid: req.validator(password)
        }))
    }

    const currentRequirements = checkRequirements(formik.values.password)

    const { isPending, error, isError, mutate } = useMutation({
        mutationFn: searchLocations,
        onSuccess: (data) => {
            if (data)
                setDropdownItems(transformLocationSearch(data))
        }
    })

    useEffect(() => {
        if (isPending) {
            setDropdownItems([
                { key: "loading", label: <div className="normal-loader !w-4"></div>, type: "title", disabled: true }
            ]);
        }
    }, [isPending]);

    const handleGeoLocation = async () => {
        const { lat, lng } = await getLocation()
        formik.setFieldValue("location", `${lat}, ${lng}`)
        formik.setFieldValue("longitude", lng)
        formik.setFieldValue("latitude", lat)
        formik.setFieldValue("manual", true)
    }

    useEffect(() => {
        mutate()
    }, [formik.values.location])

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-3">
            <div className="flex flex-col w-full gap-2 px-6 py-6 bg-white/30 backdrop-blur-lg rounded-[12px] border-[1px] border-border-primary">
                <FormInput
                    value={formik.values.hospitalName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.hospitalName}
                    error={formik.errors.hospitalName}
                    autofocus
                    PreIcon={<GiHospitalCross color={theme.colors.text.tetiary} />}
                    name="hospitalName"
                    type="text"
                    placeholder="Enter hospital name"
                    label="Hospital Name"
                />

                <Dropdown
                    menuItems={regionDropdown}
                >
                    <FormInput
                        value={searchRegion}
                        handleChange={(e) => setSearchRegion(e?.target.value ?? "")}
                        handleBlur={formik.handleBlur as any}
                        touched={formik.touched.region}
                        error={formik.errors.region}
                        PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                        PostIcon={<BiChevronDown color={theme.colors.text.tetiary} />}
                        name="region"
                        type="text"
                        placeholder="Enter region"
                        label="Region"
                        autoComplete="off"
                    />
                </Dropdown>

                <Dropdown
                    menuItems={districtDropdown}
                >
                    <FormInput
                        value={searchDistrict}
                        handleChange={(e) => setSearchDistrict(e?.target.value ?? "")}
                        handleBlur={formik.handleBlur as any}
                        touched={formik.touched.district}
                        error={formik.errors.district}
                        PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                        PostIcon={<BiChevronDown color={theme.colors.text.tetiary} />}
                        name="district"
                        type="text"
                        placeholder="Enter district"
                        label="District"
                        autoComplete="off"
                    />
                </Dropdown>

                <Dropdown
                    className="w-full"
                    outterContainerClassName="w-full"
                    display={showCoordinatesInput}
                    component={
                        <Coordinates
                            setCoodinatesInput={setCoodinatesInput}
                            setDisplay={setShowCoordinatesInput}
                            setCoordinates={setCoordinates}
                            coordinates={coordinates}
                            setLongitude={setLongitude}
                            longitude={longitude}
                            setLatitude={setLatitude}
                            latitude={latitude}
                            parentFormik={formik}
                        />
                    }
                >
                    <Dropdown
                        menuItems={dropdownItems}
                        className="w-full max-h-[300px] overflow-y-auto"
                        outterContainerClassName="w-full"
                        display={showSuggestions}
                    >
                        <FormInput
                            value={formik.values.location}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            touched={formik.touched.location}
                            error={formik.errors.location}
                            PreIcon={<MdMyLocation color={theme.colors.text.tetiary} />}
                            PostIcon={
                                <Pressable onClick={handleGeoLocation}>
                                    <Tooltip
                                        title="Get current location"
                                    >
                                        <div className="py-[6px] px-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary cursor-pointer">
                                            <FaLocationDot size={12} color={theme.colors.main.primary} />
                                        </div>
                                    </Tooltip>
                                </Pressable>
                            }
                            name="location"
                            type="text"
                            placeholder="Enter location"
                            label="location"
                            autoComplete="off"
                            inputProps={{
                                onFocus: (e) => {
                                    if (e.target.value.length === 0) {
                                        setShowCoordinatesInput(true)
                                        setShowSuggestions(false)
                                    } else {
                                        setShowCoordinatesInput(false)
                                        setShowSuggestions(true)
                                    }
                                },
                                onChange: (e) => {
                                    if (e.target.value.length === 0) {
                                        setShowCoordinatesInput(true)
                                        setShowSuggestions(false)
                                    } else {
                                        setShowCoordinatesInput(false)
                                        setShowSuggestions(true)
                                    }
                                },
                                onBlur: () => {
                                    setShowSuggestions(false)
                                }
                            }}
                        />
                    </Dropdown>
                </Dropdown>

                <FormInput
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                    name="email"
                    type="text"
                    placeholder="Eg: johndoe@paiv.com"
                    label="Email"
                />

                <div className="relative">
                    <FormInput
                        value={formik.values.password}
                        handleChange={(e) => {
                            formik.handleChange(e)
                            if (!showRequirements && (e?.target.value?.length ?? 0) > 0) {
                                setShowRequirements(true)
                            }
                        }}
                        handleBlur={(e: any) => {
                            formik.handleBlur(e)
                            console.log("blurrr")
                            setShowRequirements(false)
                        }}
                        inputProps={{
                            onFocus: () => {
                                if (formik.values.password.length > 0) {
                                    setShowRequirements(true)
                                }
                            }
                        }}
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        PreIcon={<RiLockPasswordFill color={theme.colors.text.tetiary} />}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        label="Password"
                        autoComplete="new-password"
                        PostIcon={
                            showPassword ?
                                <FaEyeSlash
                                    color={theme.colors.text.secondary}
                                    onClick={() => setShowPassword(false)}
                                    className='cursor-pointer'
                                />
                                :
                                <FaEye
                                    color={theme.colors.text.secondary}
                                    onClick={() => setShowPassword(true)}
                                    className='cursor-pointer'
                                />
                        }
                    />

                    {
                        showRequirements && (
                            <motion.div
                                className="absolute z-10 bg-bg-primary shadow-xl border-[1px] border-border-secondary px-4 py-3 mt-2 rounded-xl w-full"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="space-y-2">
                                    <Text
                                        textColor={theme.colors.text.secondary}
                                        bold={theme.typography.bold.md}
                                    >
                                        Password requirements:
                                    </Text>
                                    <div className="flex flex-col gap-2">
                                        {
                                            currentRequirements.map((req, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1"
                                                >
                                                    {req.isValid ? (
                                                        <MdCheckCircle color={theme.colors.main.primary} />
                                                    ) : (
                                                        <MdErrorOutline color={theme.colors.main.primary} />
                                                    )}
                                                    <Text
                                                        textColor={req.isValid ? theme.colors.main.primary : theme.colors.text.tetiary}
                                                    >
                                                        {req.text}
                                                    </Text>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </div>

                <Button
                    text="Register"
                    className="!w-full !h-[45px] !rounded-xl !bg-main-primary"
                    loading={loading}
                />
                <PrivacyText />
            </div>
        </form>
    )
}
export default Form