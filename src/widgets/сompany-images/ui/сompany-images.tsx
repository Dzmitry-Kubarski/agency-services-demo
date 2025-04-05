import classes from './сompany-images.module.css'

import { AddCompanyImage, DeleteImage } from '@/features'

import { ICompany } from '@/shared/api/companies'

interface Iprops {
    company: ICompany
}

export const CompanyImages = ({ company }: Iprops) => {
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Photos</p>

                <AddCompanyImage companyId={company.id} />
            </div>

            <div className={classes.body}>
                <div className={classes.images}>
                    {company.photos.map((elem) => (
                        <div className={classes.imageWrap} key={elem.filepath}>
                            <div className={classes.action}>
                                <DeleteImage companyId={company.id} imageName={elem.name} />
                            </div>

                            <img src={elem.filepath} alt={elem.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
