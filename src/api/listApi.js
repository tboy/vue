import request from '@/utils/request'

//项目信息汇总
export function getApidashboard(data) {
  return request({
    url: '/index?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}
// 待办事项查询
export function getProject(data) {
  return request({
    url: '/project?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}
// 迭代待办事项查询 /api/team.summary/iteration
export function getIteration(data) {
  return request({
    url: '/iteration?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}
//POST,GET 任务待办事项查询 /api/team.summary/task

export function getTask(data) {
  return request({
    url: '/task?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}

// POST,GET bug待办事项查询 /api/team.summary/bug

export function getBug(data) {
  return request({
    url: '/bug?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}
// POST,GET 团队分布统计 /api/team.summary/echarts

export function getEcharts(data) {
  return request({
    url: '/echarts?team_project_id='+data.team_project_id,
    method: 'post',
    data
  })
}
// POST,GET 责任人任务明细查询 /api/team.summary/detail

export function getDetail(data) {
  return request({
    url: '/detail?team_project_id='+data.team_project_id+"&manager_userid="+data.manager_userid+"&expected_time="+data.expected_time,
    method: 'post',
    data
  })
}
