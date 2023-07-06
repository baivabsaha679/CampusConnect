import { Button, Table, TableHead, TableBody, TableRow, TableCell,styled} from "@mui/material";
import { categories } from "../../constants/data";
import {Link, useSearchParams} from 'react-router-dom'

const StyledButton=styled(Button)`
    margin:20px;
    width:85%;
    background:#6495ED;
    color:#fff;
`
const StyledTable=styled(Table)`
    border:1px solid rgba(224,224,224,1);
`
const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`

const Categories=()=>{
    
    const [searchParam]=useSearchParams();
    const category=searchParam.get('category')

    return(
        <>
          <StyledLink to={'/create?category='+(category || '')}>
              <StyledButton variant="contained">CREATE POST</StyledButton>
          </StyledLink>

          <StyledTable>
             <TableHead>
                <TableRow>
                    <TableCell>
                        <StyledLink to='/'>
                           All Categories
                        </StyledLink>
                    </TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
                {
                    categories.map(category=>(
                        <TableRow key={category.id}>
                            <TableCell>
                                <StyledLink to={'/?category='+category.type}>
                                   {category.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))
                }
             </TableBody>
          </StyledTable>
        </>
    )
}
export default Categories