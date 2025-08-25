import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import Button from "@components/button/button"
import { useRegisterContext } from "../context/register-context"
import { MdUpload } from "react-icons/md"
import { GiCloudUpload } from "react-icons/gi"
import { useState } from "react"
import { HiDocumentText } from "react-icons/hi2"
import { IoIosCloseCircle } from "react-icons/io"
import ClickableTab from "@components/clickable/clickabletab"
import { DatePicker } from "antd"
import moment from "moment"
import SlideIn from "@styles/components/slidein"

const CredentialingForm = () => {
    const { step, setStep, credentialFormik, credentialUploadLoading } = useRegisterContext()
    const [dragActive, setDragActive] = useState(false)

    // Format file size to appropriate unit (KB, MB, GB)
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            credentialFormik.setFieldValue("credentialingDocument", file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                credentialFormik.setFieldValue("credentialingDocument", file)
            }
        }
    }

    return (
        <SlideIn direction="right" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text
                    bold={theme.text.bold.md}
                    size={theme.text.size.HM}
                >
                    Credentialing Information
                </Text>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Certificates and documentation
                </Text>
            </div>
            <div className="flex flex-col gap-1">
                <Text>Credential Id *</Text>
                <Input
                    placeholder="Eg. 1234567890"
                    value={credentialFormik.values.credentialId}
                    onChange={(e) => credentialFormik.handleChange(e)}
                    onBlur={(e) => credentialFormik.handleBlur(e)}
                    name="credentialId"
                    className="shadow-xs"
                    borderColor={(credentialFormik.errors.credentialId && credentialFormik.touched.credentialId) && theme.colors.text.danger}
                />
                {
                    (credentialFormik.errors.credentialId && credentialFormik.touched.credentialId) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {credentialFormik.errors.credentialId}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Issue Date *</Text>
                <DatePicker
                    value={credentialFormik.values.issueDate ? moment(credentialFormik.values.issueDate) : null}
                    onChange={(date) => {
                        credentialFormik.setFieldValue('issueDate', date ? date.format('YYYY-MM-DD') : '');
                    }}
                    onBlur={() => credentialFormik.setFieldTouched('issueDate', true)}
                    name="issueDate"
                    className="shadow-xs h-[40px] w-full !rounded-lg !border-border-secondary"
                    style={{ 
                        borderColor: (credentialFormik.errors.issueDate && credentialFormik.touched.issueDate) ? theme.colors.text.danger : undefined,
                        color: (credentialFormik.errors.issueDate && credentialFormik.touched.issueDate) ? theme.colors.text.danger : undefined,
                        fontFamily: "montserrat",
                        fontSize: "12px",
                        fontWeight: theme.text.bold.sm2,
                    }}
                    format="YYYY-MM-DD"
                />
                {
                    (credentialFormik.errors.issueDate && credentialFormik.touched.issueDate) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {credentialFormik.errors.issueDate}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Expiry Date *</Text>
                <DatePicker
                    value={credentialFormik.values.expiryDate ? moment(credentialFormik.values.expiryDate) : null}
                    onChange={(date) => {
                        credentialFormik.setFieldValue('expiryDate', date ? date.format('YYYY-MM-DD') : '');
                    }}
                    onBlur={() => credentialFormik.setFieldTouched('expiryDate', true)}
                    name="expiryDate"
                    className="shadow-xs h-[40px] w-full !rounded-lg !border-border-secondary"
                    style={{ 
                        borderColor: (credentialFormik.errors.expiryDate && credentialFormik.touched.expiryDate) ? theme.colors.text.danger : undefined,
                        color: (credentialFormik.errors.expiryDate && credentialFormik.touched.expiryDate) ? theme.colors.text.danger : undefined,
                        fontFamily: "montserrat",
                        fontSize: "12px",
                        fontWeight: theme.text.bold.sm2,
                    }}
                    format="YYYY-MM-DD"
                />
                {
                    (credentialFormik.errors.expiryDate && credentialFormik.touched.expiryDate) && (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {credentialFormik.errors.expiryDate}
                        </Text>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <Text>Credential Document Upload (PDF or Image) *</Text>
                {
                    !credentialFormik.values.credentialingDocument ? (
                        <div 
                            className={`flex w-full flex-col gap-2 bg-main-primary/5 rounded-lg border border-dashed h-[100px] justify-center items-center transition-all duration-200 cursor-pointer 
                                ${dragActive ? 'border-main-primary bg-main-primary/10' : '' }
                                ${credentialFormik.errors.credentialingDocument && credentialFormik.touched.credentialingDocument ? 'border-text-danger' : 'border-border-secondary'}
                            `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={(e) => {
                                const input = document.getElementById('file-upload') as HTMLInputElement;
                                if (input) input.click();
                            }}
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileSelect}
                                id="file-upload"
                            />
                            <div className="flex rounded-lg bg-main-primary/10 p-3 shadow-xl">
                                <GiCloudUpload
                                    size={18}
                                    color={theme.colors.text.primary}
                                />
                            </div>
                            <Text
                                textColor={theme.colors.text.tetiary}
                            >
                                Drag and drop or click to upload
                            </Text>
                        </div>
                    ) : null
                }
                {
                    credentialFormik.values.credentialingDocument ? (
                        <div className="w-full justify-between rounded-xl border border-[#E97713]/20 bg-[#E97713]/5 p-2 flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex rounded-lg bg-[#E97713]/10 p-3">
                                    <HiDocumentText
                                        size={18}
                                        color={"#E97713"}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Text
                                        ellipsis
                                        maxLines={1}
                                    >
                                        {credentialFormik.values.credentialingDocument.name}
                                    </Text>
                                    <Text
                                        textColor={theme.colors.text.tetiary}
                                    >
                                        {formatFileSize(credentialFormik.values.credentialingDocument.size)} - {credentialFormik.values.credentialingDocument.type}
                                    </Text>
                                </div>
                            </div>
                            <ClickableTab
                                onClick={() => credentialFormik.setFieldValue("credentialingDocument", null)}
                                className="!rounded-full !p-1"
                            >
                                <IoIosCloseCircle
                                    size={16}
                                    color={"#E97713"}
                                />
                            </ClickableTab>
                        </div>
                    ) : null
                }
                {
                    credentialFormik.errors.credentialingDocument && credentialFormik.touched.credentialingDocument ? (
                        <Text
                            textColor={theme.colors.text.danger}
                        >
                            {credentialFormik.errors.credentialingDocument}
                        </Text>
                    ) : null
                }
            </div>
            <Button
                text="Next"
                onClick={credentialFormik.handleSubmit}
                loading={credentialUploadLoading}
                className="!w-full !h-[45px]"
            />
        </SlideIn>
    )
}

export default CredentialingForm
