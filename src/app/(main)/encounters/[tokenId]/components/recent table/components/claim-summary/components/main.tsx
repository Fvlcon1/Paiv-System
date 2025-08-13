import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Diagnosis from "./diagnosis/diagnosis"
import Drugs from "./drugs/drugs"
import MedicalProcedures from "./medicalProcedures"
import LabTests from "./labTests"
import theme from "@styles/theme"
import { IClaimsDetailType } from '../utils/types';

const Main = ({
    maxHeight,
    claimDetails
} : {
    maxHeight : number | null,
    claimDetails: IClaimsDetailType
}) => {
    return (
        <div 
            className="flex flex-col gap-5 pb-4 px-4 overflow-y-auto pt-4"
            style={{
                maxHeight: maxHeight ? `${maxHeight}px` : "800px",
            }}
        >
            <SummaryItem 
                label="Service Outcome" 
                value={claimDetails.serviceOutcome} 
            />
            <SummaryItem 
                label="Service Type 1" 
                value={claimDetails.serviceType1} 
            />
            <SummaryItem 
                label="Service Type 2" 
                value={claimDetails.serviceType2} 
            />
            <SummaryItem 
                label="Type of Attendance" 
                value={claimDetails.typeofAttendance} 
            />
            <SummaryList 
                label="Specialties" 
                items={claimDetails.specialties} 
            />
            <Diagnosis diagnosis={claimDetails.diagnosis} />
            <WithTotal total={claimDetails.medicalProceduresTotal}>
                <MedicalProcedures procedures={claimDetails.medicalProcedures} />
            </WithTotal>
            <WithTotal total={claimDetails.drugsTotal}>
                <Drugs drugs={claimDetails.drugs} />
            </WithTotal>
            <WithTotal total={claimDetails.labTestsTotal}>
                <LabTests tests={claimDetails.labTests} />
            </WithTotal>
        </div>
    )
}

const WithTotal = ({
    total,
    children
} : {
    total : number
    children : React.ReactNode
}) => (
    <div className="w-full flex flex-col gap-2">
        {children}
        <div className="wfull flex justify-end">
            <Text>
                Total: 
                <Text bold={TypographyBold.md2}>
                    &nbsp;GHS {total}
                </Text>
            </Text>
        </div>
    </div>
)

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex gap-2 items-center">
        <Text textColor={theme.colors.text.tetiary}>{label}:</Text>
        {
            value ? (
                <Text>{value}</Text>
            ) : (
                <Text bold={TypographyBold.md2} textColor={theme.colors.text.tetiary}>Not specified</Text>
            )
        }
    </div>
);

const SummaryList = ({ label, items }: { label: string; items: string[] }) => (
    <div className="flex gap-1">
        <Text textColor={theme.colors.text.tetiary}>{label}:</Text>
        {items?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <div 
                        className="flex gap-1 px-2 bg-bg-secondary border border-border-primary rounded-full"
                        key={`${label}-${index}`}
                    >
                        <Text bold={TypographyBold.md}>
                            {item}
                        </Text>
                    </div>
                ))}
            </div>
        ) : (
            <Text textColor={theme.colors.text.tetiary} bold={TypographyBold.md2}>None specified</Text>
        )}
    </div>
);

export default Main;