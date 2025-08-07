import { AccountData } from "@/lib/types"

export default function AccountInformation({ ...account }: AccountData) {
    return (
        <>
            <div>
                <p>{account.gradePointSystem}</p>
                <p>{account.courseDuration}</p>
                <p>{account.departmentName}</p>
                <p>{account.facultyName}</p>
                <p>{account.universityName}</p>
                <p>{account.startYear}</p>
            </div>
        </>
    )
}
