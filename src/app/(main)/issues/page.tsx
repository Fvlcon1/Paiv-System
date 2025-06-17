'use client'

import Controls from "./components/controls/controls"
import IssueList from "./components/issue-list/issue-list"

const Issues = () => {
    return (
        <div className="w-full h-full flex-col flex">
            <div className="h-[60px] w-full border-b-[1px] border-border-primary px-8 py-4 fixed top-[60px] bg-bg-primary z-[10]">
                <Controls />
            </div>
            <div className="w-full h-full flex-col flex items-center py-[60px]">
                <div className="w-full px-8 max-w-[1000px] flex-col gap-8 flex py-6">
                    <IssueList />
                </div>
            </div>
        </div>
    )
}
export default Issues