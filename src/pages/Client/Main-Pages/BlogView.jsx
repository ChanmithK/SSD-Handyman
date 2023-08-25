import React from 'react'
import BlogViewSubPage from '../BlogViewSubPage'
import { Box, Grid } from '@mui/material'
import MenuAppBar from '../../../components/Client/layouts/Appbar'
import MiniDrawer from '../../../components/Client/layouts/Drawer'
import classes from './CustomGrid.module.css'

function BlogView() {
  return (
    <div>
      <div className={classes.row}>
        <div className={`${classes['col']} ${classes['col-12']}`}>
          <MenuAppBar />
        </div>
      </div>
      <div className={classes.row}>
        <div className={`${classes['col']} ${classes['col-1']}`}>
          <MiniDrawer />
        </div>
        <div className={`${classes['col']} ${classes['col-11']}`}>
          <BlogViewSubPage />
        </div>
      </div>
    </div>
  )
}

export default BlogView
